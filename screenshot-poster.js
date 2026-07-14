const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage({
    viewport: { width: 1440, height: 2000 }
  });

  await page.goto("http://localhost:3000/poster", {
    waitUntil: "networkidle"
  });

  await page.screenshot({
    path: "public/poster/downloads/Kampus-KonnectSA-Poster.png",
    fullPage: true
  });

  await browser.close();

  console.log("SUCCESS: Poster created");
})();
