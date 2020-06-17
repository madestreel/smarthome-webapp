const axios = require('axios');
const express = require('express');
const log = require('debug')(process.env.SERVICE_NAME);
const auth = process.env.REACT_APP_AUTH_SERVICE_URL;

const app = express.Router();
const db = require('./utils/actions');

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

app.post('/action', (req, res) => {
  if (!(req.body.hasOwnProperty('token') && req.body.hasOwnProperty('topic') && req.body.hasOwnProperty('action'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  isConnected(req.body.token).then(_ => {
    return db.action(req.body.id, req.body.topic, req.body.action, req.body.token).then(val => {
      res.status(200).json({message: 'success', value: val})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});

app.get('/', (req, res) => {
  return res.status(200).json({status: "success"})
});
module.exports = app;
