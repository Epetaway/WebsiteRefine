import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const basePath = new URL(baseUrl).pathname.replace(/\/$/, "");
const routePath = (url) => {
  const pathname = new URL(url).pathname;
  if (!basePath || !pathname.startsWith(basePath)) return pathname;
  return pathname.slice(basePath.length) || "/";
};
const chromePath =
  process.env.CHROME_BIN ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDirectory = path.resolve("tmp/browser-qa");

const canonicalRoutes = [
  "/",
  "/work",
  "/work/withyou",
  "/work/dojonet",
  "/work/gundam-forge",
  "/work/earl-the-kaiju",
  "/research",
  "/field-notes",
  "/field-notes/teaching-jiu-jitsu-and-ux",
  "/about",
  "/resume",
  "/contact",
  "/graduate-review",
];

const routes = process.env.QA_ROUTES
  ? process.env.QA_ROUTES.split(",")
  : canonicalRoutes;
const widths = process.env.QA_WIDTHS
  ? process.env.QA_WIDTHS.split(",").map(Number)
  : [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const screenshotTargets = new Set([
  "320:/",
  ...canonicalRoutes.map((route) => `375:${route}`),
  "768:/work/withyou",
  "768:/work/earl-the-kaiju",
  "1024:/graduate-review",
  ...canonicalRoutes.map((route) => `1440:${route}`),
]);

await fs.mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--disable-dev-shm-usage"],
});

const context = await browser.newContext({
  reducedMotion: "reduce",
  colorScheme: "light",
});
const page = await context.newPage();
const consoleErrors = [];
const pageErrors = [];

page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => pageErrors.push(error.message));

const results = [];

try {
  for (const width of widths) {
    const height =
      width <= 430 ? 844 : width === 768 ? 1024 : width === 1024 ? 768 : 900;
    await page.setViewportSize({ width, height });

    for (const route of routes) {
      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle",
      });
      await page.locator("main h1").waitFor({ state: "visible" });
      await page.evaluate(() => document.fonts.ready);
      await page.locator("img").evaluateAll(async (images) => {
        for (const image of images) image.loading = "eager";
        await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
      });

      const dom = await page.evaluate(() => {
        const ids = Array.from(document.querySelectorAll("[id]"), (element) => element.id);
        const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
        const images = Array.from(document.images);
        const html = document.documentElement;

        return {
          title: document.title,
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
          description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
          ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? "",
          h1Count: document.querySelectorAll("h1").length,
          mainCount: document.querySelectorAll("main").length,
          headerCount: document.querySelectorAll("body > div header.site-header").length,
          footerCount: document.querySelectorAll("body > div footer.site-footer").length,
          iframeCount: document.querySelectorAll("iframe").length,
          duplicateIds,
          brokenImages: images
            .filter((image) => !image.complete || image.naturalWidth === 0)
            .map((image) => image.currentSrc || image.src),
          missingAlt: images
            .filter((image) => !image.hasAttribute("alt"))
            .map((image) => image.currentSrc || image.src),
          overflow: Math.max(0, html.scrollWidth - window.innerWidth),
        };
      });

      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      const entry = {
        route,
        width,
        status: response?.status() ?? 0,
        ...dom,
        axeViolations: accessibility.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.length,
          help: violation.help,
          targets: violation.nodes.slice(0, 12).map((node) => ({
            target: node.target,
            failureSummary: node.failureSummary,
          })),
        })),
      };
      results.push(entry);

      if (/^\/work\/(withyou|dojonet|gundam-forge)$/.test(route)) {
        const deepDiveSummary = page.locator(".case-deep-dive > summary");
        await deepDiveSummary.focus();
        await page.keyboard.press("Enter");
        await page.locator(".prototype-frame").waitFor({ state: "visible" });
        await page.locator("img").evaluateAll(async (images) => {
          for (const image of images) image.loading = "eager";
          await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
        });

        const fullDom = await page.evaluate(() => {
          const ids = Array.from(document.querySelectorAll("[id]"), (element) => element.id);
          const images = Array.from(document.images);
          return {
            duplicateIds: [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))],
            brokenImages: images
              .filter((image) => image.complete && image.naturalWidth === 0)
              .map((image) => image.currentSrc || image.src),
            missingAlt: images
              .filter((image) => !image.hasAttribute("alt"))
              .map((image) => image.currentSrc || image.src),
            overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
          };
        });
        const fullAccessibility = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();

        results.push({
          ...entry,
          ...fullDom,
          route: `${route}#full`,
          axeViolations: fullAccessibility.violations.map((violation) => ({
            id: violation.id,
            impact: violation.impact,
            nodes: violation.nodes.length,
            help: violation.help,
            targets: violation.nodes.slice(0, 12).map((node) => ({
              target: node.target,
              failureSummary: node.failureSummary,
            })),
          })),
        });
      }

      if (screenshotTargets.has(`${width}:${route}`)) {
        const slug = route === "/" ? "home" : route.replaceAll("/", "-").slice(1);
        await page.screenshot({
          path: path.join(outputDirectory, `${width}-${slug}.png`),
          fullPage: true,
        });
      }
    }
  }

  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const skipLinkFocused = await page.locator(".skip-link").evaluate(
    (element) => element === document.activeElement,
  );
  await page.keyboard.press("Enter");
  const skipLinkTarget = new URL(page.url()).hash === "#main-content";

  const menuButton = page.getByRole("button", { name: "Menu" });
  await menuButton.click();
  const mobileDialogOpened = await page.getByRole("dialog", { name: "Site navigation" }).isVisible();
  const menuFocusContained = await page.evaluate(
    () => document.querySelector('[role="dialog"]')?.contains(document.activeElement) ?? false,
  );
  await page.keyboard.press("Escape");
  const mobileDialogClosed = await page.getByRole("dialog", { name: "Site navigation" }).count() === 0;
  const menuFocusRestored = await menuButton.evaluate(
    (element) => element === document.activeElement,
  );

  const redirects = [];
  for (const [legacy, expected] of [
    ["/projects/withyou", "/work/withyou"],
    ["/how-i-think", "/research"],
    ["/blog", "/field-notes"],
    ["/earldkaiju", "/work/earl-the-kaiju"],
    ["/EarldKaiju", "/work/earl-the-kaiju"],
    ["/projects/earl-the-kaiju", "/work/earl-the-kaiju"],
  ]) {
    await page.goto(`${baseUrl}${legacy}`, { waitUntil: "networkidle" });
    redirects.push({
      legacy,
      expected,
      actual: routePath(page.url()),
    });
  }

  await page.goto(`${baseUrl}/not-a-real-route`, { waitUntil: "networkidle" });
  const notFound = {
    path: routePath(page.url()),
    heading: await page.locator("h1").innerText(),
  };

  const documents = [];
  for (const documentPath of [
    "/assets/Earl-Hickson-Jr-Resume.pdf",
    "/assets/application/Earl-Hickson-Jr-HCI-Graduate-CV.pdf",
  ]) {
    const response = await context.request.get(`${baseUrl}${documentPath}`);
    documents.push({
      path: documentPath,
      status: response.status(),
      contentType: response.headers()["content-type"] ?? "",
      bytes: (await response.body()).byteLength,
    });
  }

  const specialChecks = [];
  for (const [label, viewport, route] of [
    ["mobile-landscape", { width: 844, height: 390 }, "/"],
    ["mobile-landscape", { width: 844, height: 390 }, "/work/withyou"],
    ["mobile-landscape", { width: 844, height: 390 }, "/graduate-review"],
    ["mobile-landscape", { width: 844, height: 390 }, "/work/earl-the-kaiju"],
    ["200-percent-zoom-equivalent", { width: 640, height: 450 }, "/work/earl-the-kaiju"],
    ["200-percent-zoom-equivalent", { width: 640, height: 450 }, "/"],
    ["200-percent-zoom-equivalent", { width: 640, height: 450 }, "/resume"],
    ["200-percent-zoom-equivalent", { width: 640, height: 450 }, "/graduate-review"],
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await page.locator("main h1").waitFor({ state: "visible" });
    specialChecks.push({
      label,
      route,
      viewport,
      overflow: await page.evaluate(
        () => Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
      ),
    });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/graduate-review`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html { font-size: 125% !important; }" });
  specialChecks.push({
    label: "large-default-font",
    route: "/graduate-review",
    viewport: { width: 390, height: 844 },
    overflow: await page.evaluate(
      () => Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
    ),
  });

  const undersizedPrimaryTargets = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".button, .site-menu-button, .mobile-nav__link, .case-deep-dive > summary, .review-jump-nav a, .prototype-button, .etk-deep > summary, .etk-subnav a",
      ),
    )
      .filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && rect.width > 0 && rect.height > 0 && rect.height < 44;
      })
      .map((element) => ({
        text: element.innerText.trim().slice(0, 80),
        height: Math.round(element.getBoundingClientRect().height),
      })),
  );

  const summary = {
    baseUrl,
    generatedAt: new Date().toISOString(),
    routes: routes.length,
    widths,
    checks: results.length,
    failures: {
      http: results.filter((result) => result.status !== 200).length,
      overflow: results.filter((result) => result.overflow > 1).length,
      landmarks: results.filter(
        (result) =>
          result.h1Count !== 1 ||
          result.mainCount !== 1 ||
          result.headerCount !== 1 ||
          result.footerCount !== 1,
      ).length,
      iframes: results.filter((result) => result.iframeCount !== 0).length,
      duplicateIds: results.filter((result) => result.duplicateIds.length > 0).length,
      images: results.filter(
        (result) => result.brokenImages.length > 0 || result.missingAlt.length > 0,
      ).length,
      metadata: results.filter(
        (result) =>
          !result.title.includes("Earl Hickson Jr.") ||
          !result.canonical.startsWith("https://ehicksonjr.com") ||
          !result.description ||
          !result.ogTitle,
      ).length,
      axe: results.filter((result) => result.axeViolations.length > 0).length,
      console: consoleErrors.length,
      runtime: pageErrors.length,
    },
    keyboard: {
      skipLinkFocused,
      skipLinkTarget,
      mobileDialogOpened,
      menuFocusContained,
      mobileDialogClosed,
      menuFocusRestored,
    },
    redirects,
    notFound,
    documents,
    specialChecks,
    undersizedPrimaryTargets,
    consoleErrors,
    pageErrors,
  };

  await fs.writeFile(
    path.join(outputDirectory, "results.json"),
    `${JSON.stringify({ summary, results }, null, 2)}\n`,
  );

  console.log(JSON.stringify(summary, null, 2));

  const hasFailure =
    Object.values(summary.failures).some((count) => count > 0) ||
    Object.values(summary.keyboard).some((passed) => !passed) ||
    redirects.some((redirect) => redirect.actual !== redirect.expected) ||
    notFound.path !== "/not-a-real-route" ||
    !notFound.heading ||
    specialChecks.some((check) => check.overflow > 1) ||
    undersizedPrimaryTargets.length > 0 ||
    documents.some(
      (document) =>
        document.status !== 200 ||
        !document.contentType.includes("application/pdf") ||
        document.bytes < 5_000,
    );

  if (hasFailure) process.exitCode = 1;
} finally {
  await browser.close();
}
