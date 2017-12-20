/**
 * Created by Salman on 12/20/2017.
 */

// addUser(id, name, room)
// getUser(id)
// removeUser(id)
// getUsersList(room)

class Users{

    constructor(id, name, room){
        this.users = [];
    }

    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=> user.id !== id);
        }
        return user;
    }

    getUser(id){
        return this.users.filter((user)=> user.id === id)[0];
    }

    getUsersList(room){
        var filterUsers = this.users.filter((res) => res.room === room);
        var usersArray = filterUsers.map((user)=> user.name);

        return usersArray;
    }

}

module.exports = {Users};