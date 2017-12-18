/**
 * Created by Salman on 12/18/2017.
 */

const expect = require('expect');
const {generateMessage} = require('./message');

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


