import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import WebSocket from "ws";

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, "output/visual-qa");
const referenceRoot = path.join(projectRoot, "tmp/afrofuturist-reference-v4");
const currentBaseUrl = "http://127.0.0.1:4173";
const referenceBaseUrl = "http://127.0.0.1:4174";
const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const debugPort = Number(process.env.VISUAL_QA_DEBUG_PORT || 9444);

const pages = [
  { key: "home", route: "/", reference: "Home.dc.html" },
  { key: "investigations", route: "/work", reference: "Investigations.dc.html" },
  { key: "withyou", route: "/work/withyou", reference: "WithYou Investigation - Responsive.dc.html" },
  { key: "dojonet", route: "/work/dojonet", reference: "DojoNet Investigation.dc.html" },
  { key: "gundam-forge", route: "/work/gundam-forge", reference: "Gundam Forge Investigation.dc.html" },
  { key: "research", route: "/research", reference: "Research.dc.html" },
  { key: "field-notes", route: "/field-notes", reference: "Writing.dc.html" },
  { key: "field-note-learning", route: "/field-notes/teaching-jiu-jitsu-and-ux", reference: "Note - Five Jiu-Jitsu Habits.dc.html" },
  { key: "field-note-consent", route: "/field-notes/designing-consent", reference: "Note - Five Jiu-Jitsu Habits.dc.html" },
  { key: "field-note-information", route: "/field-notes/information-architecture-and-card-games", reference: "Note - Five Jiu-Jitsu Habits.dc.html" },
  { key: "about", route: "/about", reference: "About.dc.html" },
  { key: "resume", route: "/resume", reference: "Resume.dc.html" },
  { key: "contact", route: "/contact", reference: "Contact.dc.html" },
  { key: "graduate-review", route: "/graduate-review", reference: "Graduate Review.dc.html" },
];

const viewports = [
  { key: "desktop", width: 1440, height: 1000 },
  { key: "mobile", width: 390, height: 844 },
];

for (const directory of [outputRoot, path.join(outputRoot, "current"), path.join(outputRoot, "reference"), path.join(outputRoot, "pairs")]) mkdirSync(directory, { recursive: true });

const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function reachable(url) {
  try {
    return (await fetch(url, { signal: AbortSignal.timeout(1000) })).ok;
  } catch {
    return false;
  }
}

const preview = (await reachable(currentBaseUrl)) ? null : spawn("npm", ["exec", "vite", "--", "preview", "--host", "127.0.0.1", "--port", "4173"], { cwd: projectRoot, stdio: "ignore" });
const referenceServer = spawn("python3", ["-m", "http.server", "4174", "--bind", "127.0.0.1", "--directory", referenceRoot], { stdio: "ignore" });

for (let attempt = 0; attempt < 80 && (!(await reachable(currentBaseUrl)) || !(await reachable(referenceBaseUrl))); attempt += 1) await pause(100);
if (!(await reachable(currentBaseUrl)) || !(await reachable(referenceBaseUrl))) throw new Error("Visual QA servers did not start");

let socket = null;
let chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--disable-extensions",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  "--allow-file-access-from-files",
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${path.join(projectRoot, "tmp/visual-qa-profile")}`,
  "about:blank",
], { stdio: "ignore" });

function cleanup() {
  socket?.close();
  chrome?.kill("SIGTERM");
  preview?.kill("SIGTERM");
  referenceServer?.kill("SIGTERM");
  chrome = null;
}

process.once("exit", cleanup);
process.once("SIGINT", () => { cleanup(); process.exit(130); });

for (let attempt = 0; attempt < 60; attempt += 1) {
  try {
    if ((await fetch(`http://127.0.0.1:${debugPort}/json/version`)).ok) break;
  } catch {
    // Chrome is still starting.
  }
  await pause(100);
}

const target = await (await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: "PUT" })).json();
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

async function navigate(url, viewport) {
  await send("Emulation.setDeviceMetricsOverride", { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.width < 768 });
  const loaded = waitEvent("Page.loadEventFired");
  await send("Page.navigate", { url });
  await loaded;
  await evaluate("document.fonts.ready.then(() => true)");
  await pause(350);
}

async function capture(destination) {
  const result = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
  writeFileSync(destination, Buffer.from(result.data, "base64"));
}

async function facts() {
  return evaluate(`(() => {
    const h1 = document.querySelector('h1');
    const header = document.querySelector('body > header, #root .site-header, #root > div > header');
    const h1Style = h1 ? getComputedStyle(h1) : null;
    const bodyStyle = getComputedStyle(document.body);
    return {
      h1: h1?.textContent?.trim() || null,
      h1Count: document.querySelectorAll('h1').length,
      h1Font: h1Style?.fontFamily || null,
      h1Size: h1Style?.fontSize || null,
      bodyBackground: bodyStyle.backgroundColor,
      headerHeight: header ? Math.round(header.getBoundingClientRect().height) : null,
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    };
  })()`);
}

function runImageMagick(arguments_) {
  const result = spawnSync("magick", arguments_, { cwd: projectRoot, encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || "ImageMagick failed while composing visual QA evidence");
}

function createComparisonArtifacts() {
  for (const page of pages) {
    for (const viewport of viewports) {
      const imageWidth = viewport.key === "desktop" ? 639 : viewport.width;
      const imageHeight = viewport.key === "desktop" ? 444 : viewport.height;
      const labelHeight = viewport.key === "desktop" ? 38 : 34;
      const referenceScreenshot = path.join(outputRoot, "reference", `${page.key}-${viewport.key}.png`);
      const currentScreenshot = path.join(outputRoot, "current", `${page.key}-${viewport.key}.png`);
      const pair = path.join(outputRoot, "pairs", `${page.key}-${viewport.key}.png`);
      const side = (label, screenshot) => [
        "(",
        "-size", `${imageWidth}x${labelHeight}`,
        "xc:#0d0e12",
        "-fill", "#f2ede3",
        "-font", "/System/Library/Fonts/Supplemental/Arial.ttf",
        "-pointsize", "12",
        "-gravity", "center",
        "-annotate", "+0+0", `${label} — ${page.key}`,
        "(",
        screenshot,
        "-resize", `${imageWidth}x${imageHeight}!`,
        ")",
        "-append",
        ")",
      ];
      runImageMagick([...side("REFERENCE", referenceScreenshot), ...side("CURRENT BUILD", currentScreenshot), "+append", pair]);
    }
  }

  const groups = {
    core: ["home", "investigations", "research", "graduate-review"],
    investigations: ["withyou", "dojonet", "gundam-forge"],
    writing: ["field-notes", "field-note-learning", "field-note-consent", "field-note-information"],
    professional: ["about", "resume", "contact"],
  };
  for (const [group, pageKeys] of Object.entries(groups)) {
    for (const viewport of viewports) {
      const pairs = pageKeys.map((pageKey) => path.join(outputRoot, "pairs", `${pageKey}-${viewport.key}.png`));
      runImageMagick([...pairs, "-append", path.join(outputRoot, `alignment-${group}-${viewport.key}.png`)]);
    }
  }
}

await send("Page.enable");
await send("Runtime.enable");

const results = [];
const failures = [];
for (const page of pages) {
  for (const viewport of viewports) {
    const currentUrl = `${currentBaseUrl}${page.route}`;
    await navigate(currentUrl, viewport);
    const currentFacts = await facts();
    await capture(path.join(outputRoot, "current", `${page.key}-${viewport.key}.png`));

    const referenceUrl = `${referenceBaseUrl}/${encodeURIComponent(page.reference)}`;
    await navigate(referenceUrl, viewport);
    const referenceFacts = await facts();
    await capture(path.join(outputRoot, "reference", `${page.key}-${viewport.key}.png`));

    const result = { page: page.key, route: page.route, reference: page.reference, viewport: viewport.key, current: currentFacts, referenceFacts };
    results.push(result);
    if (currentFacts.h1Count !== 1 || referenceFacts.h1Count !== 1) failures.push(`${page.key}/${viewport.key}: expected one h1`);
    if (currentFacts.scrollWidth > currentFacts.width + 1 || referenceFacts.scrollWidth > referenceFacts.width + 1) failures.push(`${page.key}/${viewport.key}: horizontal overflow`);
    if (!currentFacts.h1Font?.includes("Source Serif") || !referenceFacts.h1Font?.includes("Source Serif")) failures.push(`${page.key}/${viewport.key}: display type mismatch`);
  }
}

writeFileSync(path.join(outputRoot, "results.json"), JSON.stringify({ generatedAt: new Date().toISOString(), pages, viewports, results, failures }, null, 2));
createComparisonArtifacts();
cleanup();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`captured ${results.length * 2} reference/current screenshots across ${pages.length} page mappings; no structural failures`);
}
