/** Visual QA screenshots for the PennForge landing page.
 *  Run: node qa-shots.mjs  (requires: npx playwright install chromium) */
import { chromium } from "playwright";

const BASE = "http://localhost:3100";
const OUT = "/tmp/cf-qa";

const shots = [
  { name: "01-hero-desktop", width: 1440, height: 900, scroll: 0 },
  { name: "02-problem-desktop", width: 1440, height: 900, scroll: "#problem" },
  { name: "03-how-desktop", width: 1440, height: 900, scroll: "#how-it-works" },
  { name: "04-demo-desktop", width: 1440, height: 900, scroll: "#demo" },
  { name: "05-pricing-desktop", width: 1440, height: 900, scroll: "#pricing" },
  { name: "06-faq-desktop", width: 1440, height: 900, scroll: "#faq" },
  { name: "07-hero-mobile", width: 390, height: 844, scroll: 0 },
  { name: "08-pricing-mobile", width: 390, height: 844, scroll: "#pricing" },
];

const browser = await chromium.launch();
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.width, height: s.height } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  if (typeof s.scroll === "string") {
    await page.locator(s.scroll).scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
  }
  await page.screenshot({ path: `${OUT}/${s.name}.png` });
  await page.close();
  console.log("saved", s.name);
}
// Demo playback mid-state
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.locator("#demo").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /play demo/i }).first().click();
  await page.waitForTimeout(7500); // a few transcript lines in
  await page.screenshot({ path: `${OUT}/09-demo-playing.png` });
  await page.close();
  console.log("saved 09-demo-playing");
}
await browser.close();
console.log("done");
