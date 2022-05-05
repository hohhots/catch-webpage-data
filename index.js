const config = require('./config.json');
const getPage = require('./getPage');
const setPage = require('./setPage');
const login = require('./login');

(async () => {
  const page = await getPage();

  await setPage.setEvent(page);

  await login(page);
  setPage.saveToDisk(page);

  let i = 1;
  while(true){
    await page.waitForTimeout(config.reloadPeriod);

    setPage.init();
    try{
      await page.reload({ waitUntil: 'networkidle2' }, { timeout: 10000});
    } catch(e){
      console.log('reload error');
      continue;
    }
    setPage.saveToDisk(page);
  }
  
  await page.browser.close();
})();