const config = require('./config.json');

async function login(page) {

  try {
    await page.goto(config.baseUrl + config.loginUrl, { waitUntil: 'networkidle0' });

    await page.type('#userName', config.username, { delay: 30 });
    await page.type('#passWord', config.password, { delay: 30 });

    await page.click('#btnLogin');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.waitForTimeout(config.waitForRenderComplete);

    await page.click('.sidebar-nav__item-text');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.waitForTimeout(config.waitForRenderComplete);
  } catch(e){}
}

module.exports = login;