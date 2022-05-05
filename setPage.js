const dayjs = require('dayjs');
var locale_cn = require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn');

const config = require('./config.json');
const utils = require('./utils');
const getImage = require('./getImage');

let savedData = {};
let newData = false;

const setPage = {
  "init": function() {
    hasNewData = false;
  },
  "setEvent": async function(page){
    page.on('response', async (response) => {
      if(response.request().resourceType() == 'xhr'){
        let rurl = new URL(response.request().url());
        if (utils.isDataPath(rurl.pathname)) {

            const { data } = await response.json();

            if(savedData[rurl.pathname]){
              if(!utils.isSameData(data, savedData[rurl.pathname])){
                savedData[rurl.pathname] = data;
                newData = true
              }
            } else {
              savedData[rurl.pathname] = data;
              newData = true;
            }
        }
      }
    });
  },
  "saveToDisk": async function (page) {
    let currentTime = dayjs();
    let text = currentTime.format('YYYY-MM-DD-HH-mm');

    if(newData){
      utils.saveData(savedData, currentTime);

      await getImage(page, currentTime);

      console.log(`New data : ${text}`);
    } else {
      console.log(`No new data : ${text}`);
    }

    newData = false;
  }
};

module.exports = setPage;