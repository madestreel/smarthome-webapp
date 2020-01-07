const axios = require('axios');
const express = require('express');
const log = require('debug')(process.env.SERVICE_NAME);
const auth = process.env.REACT_APP_AUTH_SERVICE_URL;

const app = express.Router();
const db = require('./utils/room');

/**
 * isConnected -- Check if the token is a valid token by asking the users micro-service
 *
 * @param {String} token the token to be verified
 *
 * @returns {Promise} a promise with a call to the users microservice
 */
function isConnected(token) {
  return new Promise((resolve, reject) => {
    axios.get(`${auth}/isconnected/${token}`)
    .then(res => {
      resolve("")
    })
    .catch(err => {
      reject(new Error(err.response.status))
    })
  })
}

/**
 * API to get a room
 * request params:
 *  - room: _
 *
 * request query:
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} room the room to retrieve
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                         err.message in case of invalid token and 500 otherwise.
 *  @returns {Room} In case of success the room is returned.
 *
 *  @see valid_room for the representation of the Room object.
 */
app.get('/room/:room', (req, res) => {
  if(!(req.params.hasOwnProperty('room') && req.query.hasOwnProperty('token'))) {
    return res.status(400).json({status: 'invalid request'})
  }
  let room = req.params.room;
  let token = req.query.token;
  isConnected(token).then(_ => {
    return db.getRoom(room).then(room => {
      res.status(200).json({room:room})
    }).catch(err => {
      res.status(500).json({message:String(err)})
    })
  }).catch(err => {
    res.status(err.message).json()
  })
});

app.get('/', (req, res) => {
  return res.status(200).json({status: "success"})
});
module.exports = app;
