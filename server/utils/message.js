/**
 * Created by Salman on 12/18/2017.
 */
const moment = require("moment");
const generateMessage = (from, text)=>{
    var createdAt = moment().valueOf();
    return {from, text, createdAt};
};

const generateLocationMessage = (from, lat, long)=>{
    var createdAt = moment().valueOf();
    return {from, url:`https://www.google.com/maps/?q=${lat},${long}`, createdAt};
};

module.exports = {generateMessage, generateLocationMessage};