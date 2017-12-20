/**
 * Created by Salman on 12/20/2017.
 */
const expect = require('expect');
var {Users} = require("./users");

describe("Users", ()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [
            {
                id: "1",
                name: "1",
                room: "1"
            },
            {
                id: "2",
                name: "2",
                room: "2"
            },
            {
                id: "3",
                name: "3",
                room: "1"
            }
        ];
    });

    it("should add new user", ()=>{
        var users = new Users();
        var user = {
            id: "asdsa",
            name: "salman",
            room: "salman room"
        };

        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);

    });

    it("should get list of users from room 1", ()=>{
        var roomUsers = users.getUsersList('1');
        expect(roomUsers.length).toEqual(2);
    });

    it("should get list of users from room 2", ()=>{
        var roomUsers = users.getUsersList('2');
        expect(roomUsers.length).toEqual(1);
    });

    it("should get user by ID", ()=>{
        var user = users.getUser('2');
        expect(user).toMatchObject({id: '2'});
    });

    it("should not get user by ID", ()=>{
        var user = users.getUser('4');
        expect(user).toBe();
    });

    it("should remove user by ID", ()=>{
        var user = users.removeUser('2');
        expect(user.id).toEqual('2');
        expect(users.users.length).toBe(2);
    });

    it("should not remove user by ID", ()=>{
        var user = users.removeUser('4');
        expect(user).toBe();
        expect(users.users.length).toBe(3);
    });

});

