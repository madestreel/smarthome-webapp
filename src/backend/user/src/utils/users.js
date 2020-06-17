const db = require('nano')(process.env.DB_URL);
const log = require('debug')(process.env.SERVICE_NAME);
const bcrypt = require('bcryptjs');
const tku = require('./en-de-coders');

function equalPassword(userPass, usrDBPass) {
  return bcrypt.compareSync(userPass, usrDBPass)
}

function createUser(username, password, permission) {
  return new Promise((resolve, reject) => {
    let data = {'password': bcrypt.hashSync(password, bcrypt.genSaltSync()), permission: permission};
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

function getUsersInfo() {
  return new Promise((resolve, reject) => {
    db.view('queries', 'all_users', function (error, body) {
      if (!error) {
        resolve(body.rows.map(user => user.value))
      } else {
        reject(new Error(`Failed to retrieve users`))
      }
    })
  })
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
  getUserInfo,
  getUsersInfo,
};