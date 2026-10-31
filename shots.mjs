import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/usr/bin/google-chrome" });
for (const [name, vp] of [["t900", { width: 900, height: 1100 }], ["m390", { width: 390, height: 844 }], ["d1440", { width: 1440, height: 1000 }]]) {
  const page = await b.newPage({ viewport: vp });
  await page.goto("http://localhost:4107/field-notes/a-bridge-you-meet-each-other-on"); await page.waitForSelector("h1");
  const fig = page.locator(".field-note-figure").nth(1); await fig.scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
  const box = await fig.boundingBox();
  if (name === "t900") await page.screenshot({ path: "/tmp/claude-0/-home-claude/c46ec794-bfeb-5c0c-8f8f-2eb7b6bcf10c/scratchpad/note04-" + name + ".png", clip: { x: 0, y: Math.max(box.y - 40, 0), width: vp.width, height: Math.min(box.height + 80, 1400) } });
  console.log(name, Math.round(box.width), "img", Math.round((await page.locator(".field-note-figure img").nth(1).boundingBox()).width), "overflowX", await page.evaluate(() => document.documentElement.scrollWidth > innerWidth));
  await page.close();
}
await b.close();
