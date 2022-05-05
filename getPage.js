const puppeteer = require('puppeteer');

async function getPage(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  page.browser = browser;

  return page;
};

module.exports = getPage;