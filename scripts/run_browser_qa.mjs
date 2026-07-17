import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import WebSocket from "ws";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4173";
const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = Number(process.env.QA_DEBUG_PORT || 9333);
const output = path.resolve("tmp/browser-qa");
const interactionEvidenceOutput = path.resolve("output/visual-qa/interactions");
mkdirSync(output, { recursive: true });
mkdirSync(interactionEvidenceOutput, { recursive: true });
const persistentInteractionScreenshots = new Set(["work-evidence-hover.png", "withyou-captures.png", "dojonet-captures.png", "gundam-captures.png", "implementation-capture-hover-desktop.png", "implementation-lightbox-mobile.png"]);

const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function serverIsReachable() {
  try {
    const response = await fetch(baseUrl, { signal: AbortSignal.timeout(1000) });
    return response.ok;
  } catch {
    return false;
  }
}

let preview = null;
if (!(await serverIsReachable())) {
  if (process.env.QA_BASE_URL) throw new Error(`QA_BASE_URL is not reachable: ${baseUrl}`);
  preview = spawn("npm", ["exec", "vite", "--", "preview", "--host", "127.0.0.1", "--port", "4173"], { stdio: "ignore" });
  for (let attempt = 0; attempt < 80 && !(await serverIsReachable()); attempt += 1) await pause(100);
  if (!(await serverIsReachable())) throw new Error("Vite preview did not start; run npm run build first");
}

let socket = null;
let chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--disable-extensions",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${path.resolve("tmp/browser-qa-profile")}`,
  "about:blank",
], { stdio: "ignore" });

function cleanup() {
  socket?.close();
  chrome?.kill("SIGTERM");
  preview?.kill("SIGTERM");
  chrome = null;
  preview = null;
}

process.once("exit", cleanup);
process.once("SIGINT", () => { cleanup(); process.exit(130); });

async function waitForDebugger() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {
      // Chrome is still starting.
    }
    await pause(100);
  }
  throw new Error("Chrome debugging endpoint did not start");
}

await waitForDebugger();
const targetResponse = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(baseUrl)}`, { method: "PUT" });
const target = await targetResponse.json();
socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.once("open", resolve); socket.once("error", reject); });

let nextId = 1;
const pending = new Map();
const eventWaiters = new Map();
socket.on("message", (raw) => {
  const message = JSON.parse(raw.toString());
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
  const waiters = eventWaiters.get(message.method);
  if (waiters?.length) waiters.shift()(message.params);
});

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

function waitEvent(method) {
  return new Promise((resolve) => {
    const waiters = eventWaiters.get(method) || [];
    waiters.push(resolve);
    eventWaiters.set(method, waiters);
  });
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function navigate(route, width, height, mobile = width < 768) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
  const loaded = waitEvent("Page.loadEventFired");
  await send("Page.navigate", { url: `${baseUrl}${route}` });
  await loaded;
  await evaluate("document.fonts.ready.then(() => true)");
  await pause(120);
}

async function snapshot(filename) {
  const result = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
  const image = Buffer.from(result.data, "base64");
  writeFileSync(path.join(output, filename), image);
  if (persistentInteractionScreenshots.has(filename)) writeFileSync(path.join(interactionEvidenceOutput, filename), image);
}

async function pageFacts() {
  return evaluate(`({
    path: location.pathname,
    title: document.title,
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    h1: document.querySelectorAll('h1').length,
    iframe: document.querySelectorAll('iframe').length,
    main: Boolean(document.querySelector('main#main-content')),
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    canonicalCount: document.querySelectorAll('link[rel="canonical"]').length,
    bodyText: document.body.innerText.slice(0, 160)
  })`);
}

await send("Page.enable");
await send("Runtime.enable");

const checks = [];
const failures = [];
const homeViewports = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
for (const width of homeViewports) {
  await navigate("/", width, width < 600 ? 760 : 900);
  const facts = await pageFacts();
  checks.push({ name: `home-${width}`, ...facts });
  if (facts.scrollWidth > facts.width + 1 || facts.h1 !== 1 || facts.iframe !== 0 || !facts.main || facts.canonicalCount !== 1) failures.push(`Home failed at ${width}px: ${JSON.stringify(facts)}`);
  await snapshot(`home-${width}.png`);
}

for (const [width, height, name] of [[1440, 1000, "desktop"], [390, 844, "mobile"]]) {
  await navigate("/", width, height, width < 768);
  const section = await evaluate(`(() => {
    const element = document.querySelector('.home-investigations');
    element?.scrollIntoView({block:'start'});
    return {
      exists: Boolean(element),
      genericNumber: Boolean(element?.querySelector('.section-header__number')),
      campaigns: element?.querySelectorAll('.home-campaign').length || 0,
      exhibits: element?.querySelectorAll('.home-campaign__figure img').length || 0,
      overflow: document.documentElement.scrollWidth - innerWidth
    };
  })()`);
  await pause(100);
  checks.push({ name: `home-investigations-${name}`, ...section });
  if (!section.exists || section.genericNumber || section.campaigns !== 3 || section.exhibits !== 3 || section.overflow > 1) failures.push(`Home investigation band failed ${name}: ${JSON.stringify(section)}`);
  await snapshot(`home-investigations-${name}.png`);
}

for (const [width, height, name] of [[1440, 1000, "desktop"], [390, 844, "mobile"]]) {
  await navigate("/", width, height, width < 768);
  const framework = await evaluate(`(() => {
    const element = document.querySelector('.home-framework');
    element?.scrollIntoView({block:'start'});
    return {
      exists: Boolean(element),
      title: element?.querySelector('h2')?.textContent?.trim(),
      branches: element?.querySelectorAll('.framework-branch').length || 0,
      principles: element?.querySelectorAll('.framework-principles li').length || 0,
      researchLink: element?.querySelector('a[href="/research"]')?.textContent?.trim(),
      overflow: document.documentElement.scrollWidth - innerWidth
    };
  })()`);
  await pause(100);
  checks.push({ name: `home-framework-${name}`, ...framework });
  if (!framework.exists || framework.title !== "One thesis, four working principles." || framework.branches !== 3 || framework.principles !== 4 || framework.overflow > 1) failures.push(`Home framework failed ${name}: ${JSON.stringify(framework)}`);
  await snapshot(`home-framework-${name}.png`);
}

const routeChecks = [
  ["/work/withyou", "withyou-mobile"],
  ["/research", "research-mobile"],
  ["/field-notes/designing-consent", "field-note-mobile"],
  ["/resume", "resume-mobile"],
  ["/contact", "contact-mobile"],
  ["/graduate-review", "graduate-review-mobile"],
];
for (const [route, name] of routeChecks) {
  await navigate(route, 390, 844);
  const facts = await pageFacts();
  checks.push({ name, ...facts });
  if (facts.scrollWidth > facts.width + 1 || facts.h1 !== 1 || facts.iframe !== 0 || facts.canonicalCount !== 1) failures.push(`${route} failed mobile layout: ${JSON.stringify(facts)}`);
  await snapshot(`${name}.png`);
}

for (const [width, height, name] of [[1440, 1000, "desktop"], [390, 844, "mobile"]]) {
  await navigate("/work/withyou", width, height, width < 768);
  const context = await evaluate(`(() => {
    const element = document.querySelector('.investigation-context');
    element?.scrollIntoView({block:'start'});
    return {
      exists: Boolean(element),
      numberedChapter: Boolean(element?.querySelector(':scope > strong')),
      changedMind: Boolean(element?.querySelector('.changed-mind')),
      heading: element?.querySelector('.investigation-context__heading')?.textContent?.trim(),
      overflow: document.documentElement.scrollWidth - innerWidth
    };
  })()`);
  await pause(100);
  checks.push({ name: `investigation-context-${name}`, ...context });
  if (!context.exists || context.numberedChapter || !context.changedMind || context.heading !== "Human context" || context.overflow > 1) failures.push(`Investigation human context failed ${name}: ${JSON.stringify(context)}`);
  await snapshot(`investigation-context-${name}.png`);
}

await navigate("/", 390, 844);
await evaluate("document.querySelector('.site-menu-button').click()");
await pause(50);
const menuOpen = await evaluate(`({open:Boolean(document.querySelector('.mobile-nav')), active:document.activeElement?.textContent?.trim(), overflow:document.body.style.overflow})`);
await evaluate("document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))");
await pause(50);
const menuClosed = await evaluate(`({open:Boolean(document.querySelector('.mobile-nav')), active:document.activeElement?.textContent?.trim()})`);
checks.push({ name: "mobile-menu", menuOpen, menuClosed });
if (!menuOpen.open || menuOpen.overflow !== "hidden" || menuClosed.open || menuClosed.active !== "Menu") failures.push(`Mobile navigation behavior failed: ${JSON.stringify({ menuOpen, menuClosed })}`);

for (const [route, name] of [["/work/withyou", "withyou-prototype"], ["/work/dojonet", "dojonet-prototype"], ["/work/gundam-forge", "gundam-prototype"]]) {
  await navigate(route, 430, 900);
  await evaluate("document.querySelector('.prototype-section').scrollIntoView({block:'start'})");
  await pause(80);
  const prototype = await evaluate(`({exists:Boolean(document.querySelector('.prototype-frame')), controls:document.querySelectorAll('.prototype-frame button').length, overflow:document.documentElement.scrollWidth-innerWidth})`);
  checks.push({ name, ...prototype });
  if (!prototype.exists || prototype.controls < 2 || prototype.overflow > 1) failures.push(`${name} failed: ${JSON.stringify(prototype)}`);
  await snapshot(`${name}.png`);
}

await navigate("/work", 1440, 1000, false);
const workAlignment = await evaluate(`(() => {
  const entries = [...document.querySelectorAll('.work-entry')];
  const images = [...document.querySelectorAll('.work-entry__image img')];
  return {
    entries: entries.length,
    exhibitImages: images.filter((image) => image.getAttribute('src')?.includes('home-exhibit')).length,
    expandableImages: document.querySelectorAll('.work-entry__image .expandable-image').length,
    method: Boolean(document.querySelector('.work-method')),
    extraProfessionalHistory: Boolean(document.querySelector('.professional-history')),
    overflow: document.documentElement.scrollWidth - innerWidth
  };
})()`);
checks.push({ name: "work-reference-alignment", ...workAlignment });
if (workAlignment.entries !== 3 || workAlignment.exhibitImages !== 3 || workAlignment.expandableImages !== 3 || !workAlignment.method || workAlignment.extraProfessionalHistory || workAlignment.overflow > 1) failures.push(`Work reference alignment failed: ${JSON.stringify(workAlignment)}`);

const workHoverTarget = await evaluate(`(() => {
  const element = document.querySelector('.work-entry__image .expandable-image');
  element?.scrollIntoView({block:'center'});
  const rect = element?.getBoundingClientRect();
  return rect ? {x:rect.x + rect.width / 2,y:rect.y + rect.height / 2} : null;
})()`);
if (workHoverTarget) await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: workHoverTarget.x, y: workHoverTarget.y });
await pause(260);
const workHover = await evaluate(`(() => {
  const element = document.querySelector('.work-entry__image .expandable-image');
  return element ? {renderedWidth:element.getBoundingClientRect().width,layoutWidth:element.offsetWidth,transform:getComputedStyle(element).transform} : null;
})()`);
checks.push({ name: "work-evidence-hover", ...workHover });
if (!workHover || workHover.renderedWidth < workHover.layoutWidth * 1.2 || workHover.transform === "none") failures.push(`Work evidence hover enlargement failed: ${JSON.stringify(workHover)}`);
await snapshot("work-evidence-hover.png");

for (const [route, name] of [["/work/withyou", "withyou-captures"], ["/work/dojonet", "dojonet-captures"], ["/work/gundam-forge", "gundam-captures"]]) {
  await navigate(route, 1440, 1000, false);
  const captureGrid = await evaluate(`(() => {
    const grid = document.querySelector('.capture-grid');
    grid?.scrollIntoView({block:'center'});
    const buttons = [...(grid?.querySelectorAll('.expandable-image') || [])];
    const firstImage = buttons[0]?.querySelector('img');
    const rect = firstImage?.getBoundingClientRect();
    return {exists:Boolean(grid),figures:grid?.querySelectorAll('figure').length || 0,buttons:buttons.length,ratio:rect ? rect.width / rect.height : 0,overflow:document.documentElement.scrollWidth-innerWidth};
  })()`);
  checks.push({ name, ...captureGrid });
  if (!captureGrid.exists || captureGrid.figures < 3 || captureGrid.buttons !== captureGrid.figures || Math.abs(captureGrid.ratio - 1.6) > .05 || captureGrid.overflow > 1) failures.push(`${name} failed: ${JSON.stringify(captureGrid)}`);
  await pause(80);
  await snapshot(`${name}.png`);
  if (name === "withyou-captures") {
    const captureHoverTarget = await evaluate(`(() => {
      const element = document.querySelector('.capture-grid .expandable-image');
      const rect = element?.getBoundingClientRect();
      return rect ? {x:rect.x + rect.width / 2,y:rect.y + rect.height / 2} : null;
    })()`);
    if (captureHoverTarget) await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: captureHoverTarget.x, y: captureHoverTarget.y });
    await pause(260);
    const captureHover = await evaluate(`(() => {
      const element = document.querySelector('.capture-grid .expandable-image');
      return element ? {renderedWidth:element.getBoundingClientRect().width,layoutWidth:element.offsetWidth,transform:getComputedStyle(element).transform} : null;
    })()`);
    checks.push({ name: "implementation-capture-hover-desktop", ...captureHover });
    if (!captureHover || captureHover.renderedWidth < captureHover.layoutWidth * 1.2 || captureHover.transform === "none") failures.push(`Implementation capture hover enlargement failed: ${JSON.stringify(captureHover)}`);
    await snapshot("implementation-capture-hover-desktop.png");
  }
}

await navigate("/work/withyou", 390, 844, true);
await evaluate("document.querySelector('.capture-grid')?.scrollIntoView({block:'start'})");
await pause(80);
await evaluate("document.querySelector('.capture-grid .expandable-image')?.click()");
await pause(80);
const mobileLightbox = await evaluate(`({dialog:Boolean(document.querySelector('.image-lightbox [role="dialog"]')),image:Boolean(document.querySelector('.image-lightbox figure img')),bodyOverflow:document.body.style.overflow,closeLabel:document.querySelector('.image-lightbox button')?.getAttribute('aria-label')})`);
checks.push({ name: "implementation-lightbox-mobile", ...mobileLightbox });
if (!mobileLightbox.dialog || !mobileLightbox.image || mobileLightbox.bodyOverflow !== "hidden" || mobileLightbox.closeLabel !== "Close enlarged image") failures.push(`Mobile implementation lightbox failed: ${JSON.stringify(mobileLightbox)}`);
await snapshot("implementation-lightbox-mobile.png");
await evaluate("document.querySelector('.image-lightbox button')?.click()");

await navigate("/projects", 1280, 900, false);
await pause(80);
const redirect = await pageFacts();
checks.push({ name: "legacy-redirect", ...redirect });
if (redirect.path !== "/work" || redirect.canonical !== "https://ehicksonjr.com/work" || redirect.canonicalCount !== 1) failures.push(`Legacy redirect failed: ${JSON.stringify(redirect)}`);

await navigate("/graduate-review", 640, 450, false);
const zoom = await evaluate(`({scale:2, width:innerWidth, scrollWidth:document.documentElement.scrollWidth, innerWidth})`);
checks.push({ name: "graduate-review-200-percent", ...zoom });
if (zoom.scrollWidth > zoom.innerWidth + 1) failures.push(`200% zoom overflow: ${JSON.stringify(zoom)}`);
await snapshot("graduate-review-200-percent.png");

writeFileSync(path.join(output, "results.json"), JSON.stringify({ baseUrl, checks, failures }, null, 2));
cleanup();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`browser QA passed ${checks.length} checks; results in ${output}`);
}
