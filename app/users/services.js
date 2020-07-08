const MongoLib = require('../../lib/mongo');
const bcrypt = require('bcrypt');

class UserSerive {
    constructor(){
        this.mongoDB = new MongoLib('user');
    };

    auth(username, password){
        return new Promise((resolve, reject) => {
            this.mongoDB.find({username})
            .then(data => {
                if(data.length > 0){
                    const hash = data[0].password;
                    bcrypt.compare(password, hash)
                    .then((results) => {
                        if(results){
                            const username = data[0];
                            delete username.password;
                            resolve(username)
                        }
                        reject();
                    })
                    .catch(() => reject());
                } else{
                    reject();
                }
            })
            .catch(() => reject());
        })
    };

    findByUser(username){
        return new Promise((resolve,reject) => {
            this.mongoDB.find({username})
            .then((data) => {
                if(data.length > 0){
                    const username = data[0];
                    delete username.password;
                    resolve(username);
                } else{
                    reject();
                }
            })
            .catch(err => {
                reject();
            })
        })
    }
}

module.exports = UserSerive;