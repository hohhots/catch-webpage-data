const config = require('./config.json');

async function getImage(page, currentTime){
    await page.waitForTimeout(config.waitForRenderComplete);

    try{
        await page.screenshot({ path: `${config.saveDir}/${currentTime.format('YYYY-MM-DD')}/${currentTime.format('HH-mm')}/hohhots.png` });
    } catch(e) {}
}
  
module.exports = getImage;