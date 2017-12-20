/**
 * Created by Salman on 12/18/2017.
 */

const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString()', ()=>{
    it('should be valid String', ()=>{
        var name = 'salman';
        var isrealString = isRealString(name);
        expect(isrealString).toBeTruthy();
    });

    it('should not be a valid String with object', ()=>{
        var name = {};
        var isrealString = isRealString(name);
        expect(isrealString).toBeFalsy();
    });

    it('should not be a valid String', ()=>{
        var name = '         ';
        var isrealString = isRealString(name);
        expect(isrealString).toBeFalsy();
    });
});

