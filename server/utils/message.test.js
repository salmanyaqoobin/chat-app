/**
 * Created by Salman on 12/18/2017.
 */

const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage()', ()=>{
    it('should generate correct message object', ()=>{
        var from = 'salman';
        var text = 'hello';
        var message = generateMessage(from, text);
        expect(message).toMatchObject({from, text});
        expect(message.createdAt).toBeTruthy();
        expect(message.from).toEqual(from);
        expect(message.text).toEqual(text);
    });
});


describe('generateLocationMessage()', ()=>{
    it('should generate correct location object', ()=>{
        var from = 'salman';
        var lat = '21312';
        var long = '221312';
        var newurl = `https://www.google.com/maps/?q=${lat},${long}`;
        var message = generateLocationMessage(from, lat, long);
        expect(message).toMatchObject({from, url:newurl});
        expect(message.url).not.toBeNull();
        expect(message.createdAt).toBeTruthy();
        expect(message.from).toEqual(from);
        expect(message.url).toEqual(newurl);
    });
});
