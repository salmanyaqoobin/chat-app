/**
 * Created by Salman on 12/18/2017.
 */

const generateMessage = (from, text)=>{
    var createdAt = new Date().getTime();
    return {from, text, createdAt};
};

const generateLocationMessage = (from, lat, long)=>{
    var createdAt = new Date().getTime();
    return {from, url:`https://www.google.com/maps/?q=${lat},${long}`, createdAt};
};

module.exports = {generateMessage, generateLocationMessage};