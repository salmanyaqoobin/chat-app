/**
 * Created by Salman on 12/19/2017.
 */

var isRealString = (str)=>{
    return typeof str === "string" && str.trim().length > 0;
};

module.exports = {isRealString};