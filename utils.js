const fs = require('node:fs');

const dayjs = require('dayjs');

const config = require('./config.json');

function isSameObject(obj1, obj2) {
    let sameValues = [];

    Object.keys(obj1).map( key1 => {
        if(obj1[key1] == obj2[key1]){
            sameValues.push('y');
        } else {
            sameValues.push('n');
        }
    });

    return !sameValues.find(x => x == 'n');
}

const utils = {
    isDataPath: function (path) {
        let isData = false;
        
        config.dataPath.map( dtype => {
            Object.keys(dtype).map( key => {
                if(dtype[key] == path){
                    isData = true;
                }
            });
        });
     
        return isData;
    },
    isSameData: function (currentData, newData) {
        let sameData = false;

        if(Array.isArray(newData)){
            let sameObjs = [];
             
            newData.map( ob1 => {
                currentData.map( ob2 => {
                    if(isSameObject(ob1, ob2)) {
                        sameObjs.push('y');
                    }
                });
            });

            if((sameObjs.length == newData.length) && (!sameObjs.find(x => x == 'n'))){
                sameData = true;
            }
        } else {
            if(isSameObject(currentData, newData)) {
                sameData = true;
            }
        }

        return sameData;
    },
    saveData: function (data, currentTime) {
        let dir = `${config.saveDir}/${currentTime.format('YYYY-MM-DD')}/${currentTime.format('HH-mm')}`;

        try{
             fs.mkdirSync(dir, { recursive: true });

            fs.writeFileSync(`${dir}/${currentTime.format('YYYY-MM-DD-HH-mm')}.json`, JSON.stringify(data) , 'utf-8');
        } catch(e){}
    }
};

module.exports = utils;