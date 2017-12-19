/**
 * Created by Salman on 12/19/2017.
 */

var currentTime = new Date().getTime();
var oldTime = currentTime - 3500;
var moment = require('moment');

var date = moment();
console.log(date.format("MMM YYYY"));
console.log(moment().startOf('hour').fromNow() );
console.log(moment(currentTime, "YYYYMMDD").fromNow());

//10:15 am
console.log(date.format("h:mm a"));

var dateNew = moment(oldTime);
