const axios = require('axios');
const express = require('express');
const log = require('debug')(process.env.SERVICE_NAME);
const auth = process.env.REACT_APP_AUTH_SERVICE_URL;

const app = express.Router();
const db = require('./utils/device');

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

app.get('/', (req, res) => {
  return res.status(200).json({status: "success"})
});
module.exports = app;
