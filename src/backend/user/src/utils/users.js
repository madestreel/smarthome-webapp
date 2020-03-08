const db = require('nano')(process.env.DB_URL);
const log = require('debug')(process.env.SERVICE_NAME);
const bcrypt = require('bcryptjs');
const tku = require('./en-de-coders');

function equalPassword(userPass, usrDBPass) {
    return bcrypt.compareSync(userPass, usrDBPass)
}

function createUser(username, password) {
    return new Promise((resolve, reject) => {
        let data = {'password': bcrypt.hashSync(password, bcrypt.genSaltSync())};
        db.insert(data, username, (error, success) => {
            if (success) {
                resolve(tku.encodeToken(username))
            } else {
                reject(new Error(`In the creation of user (${username}). Reason: ${error.reason}.`))
            }

        })
    })
}

function deleteUser(username) {
    return new Promise((resolve, reject) => {
        db.get(username, (error, success) => {
            if (success) {
                db.destroy(success._id, success._rev, (err, succ) => {
                    if (succ) {
                        resolve()
                    } else {
                        reject(new Error(`In deleting user (${username}).`))
                    }
                })
            } else {
                resolve()
            }
        })
    })
}

function getUser(username, password) {
    return new Promise(((resolve, reject) => {
        db.get(username, (error, success) => {
            if (success) {
                if (!equalPassword(password, success.password)) {
                    reject(new Error(`Password for user ${username} do not match.`))
                }
                resolve(tku.encodeToken(username))
            } else {
                reject(new Error(`Failed to fetch information of user ${username}.`))
            }
        })
    }))
}

function getUserInfo(token) {
    return new Promise((resolve, reject) => {
        let username = tku.decodeToken(token).sub;
        db.get(username, (error, success) => {
            if (success) {
                log(success);
                resolve(success)
            } else {
                reject(new Error(`User ${username} doesn't exist`))
            }
        })
    })
}

function isConnected(token) {
    return new Promise(((resolve, reject) => {
        let username = tku.decodeToken(token).sub;
        db.get(username, (error, success) => {
            if (success) {
                resolve()
            } else {
                reject(new Error(`User (${username}) doesn't exist.`))
            }
        })
    }))
}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    isConnected,
    getUserInfo
};