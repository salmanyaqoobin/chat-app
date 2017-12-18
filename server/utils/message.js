/**
 * Created by Salman on 12/18/2017.
 */

const generateMessage = (from, text)=>{
    var createdAt = new Date().getTime();
    return {from, text, createdAt};
};

module.exports = {generateMessage};