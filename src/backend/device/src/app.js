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

function isValidDevice(device) {
  return device.hasOwnProperty('name') &&
      device.hasOwnProperty('permission') &&
      device.hasOwnProperty('actions')
}

app.post('/device', (req, res) => {
  console.log(req.body);
  if (!(req.body.hasOwnProperty('token') && req.body.hasOwnProperty('device') && isValidDevice(req.body.device))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.body.token;
  const device = req.body.device;
  isConnected(token).then(_ => {
    return db.createDevice(device).then(_ => {
      res.status(200).json({message: "success"})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});

app.post('/update', (req, res) => {
  console.log(req.body);
  if (!(req.body.hasOwnProperty('token') && req.body.hasOwnProperty('device') && isValidDevice(req.body.device))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.body.token;
  const device = req.body.device;
  isConnected(token).then(_ => {
    return db.updateDevice(device).then(_ => {
      res.status(200).json({message: "success"})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});

/**
 * API to add a device to a room
 * request body:
 *  - roomID:
 *  - id: _
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} roomID the room id where to user will be added
 *  @param {String} id the device id of the device to be added to the room
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                        err.message in case of invalid token and 500 otherwise.
 *
 */
app.post('/room', (req, res) => {
  if (!(req.body.hasOwnProperty('token') && req.body.hasOwnProperty('id') && req.body.hasOwnProperty('roomID'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.body.token;
  const id = req.body.id;
  const roomID = req.body.roomID;
  isConnected(token).then(_ => {
    return db.addDeviceToRoom(id, roomID).then(_ => {
      res.status(200).json({message: `device (${id}) successfully added to room (${roomID})`})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  });
});


/**
 * API to delete a device from a room
 * request body:
 *  - roomID:
 *  - id: _
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} roomID the room id where to user will be added
 *  @param {String} id the device id of the device to be added to the room
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                        err.message in case of invalid token and 500 otherwise.
 *
 */
app.delete('/room', (req, res) => {
  if (!(req.body.hasOwnProperty('token') && req.body.hasOwnProperty('id') && req.body.hasOwnProperty('roomID'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.body.token;
  const id = req.body.id;
  const roomID = req.body.roomID;

  isConnected(token).then(_ => {
    return db.deleteDeviceOfRoom(id, roomID).then(_ => {
      res.status(200).json({message: 'success'})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});

app.get('/devices', (req, res) => {
  if (!(req.query.hasOwnProperty('token'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.query.token;
  isConnected(token).then(_ => {
    return db.getDevices().then(devices => {
      res.status(200).json({message: 'success', devices: devices})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});

app.get('/devices/:roomID', (req, res) => {
  if (!(req.params.hasOwnProperty('roomID') && req.query.hasOwnProperty('token'))) {
    res.status(400).json({message: "bad request"});
    return
  }

  const token = req.query.token;
  const roomID = req.params.roomID;
  isConnected(token).then(_ => {
    return db.getDevicesForRoom(roomID).then(devices => {
      res.status(200).json({message: 'success', devices: devices})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});


app.get('/device/:id', (req, res) => {
  if (!(req.params.hasOwnProperty('id') && req.query.hasOwnProperty('token'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.query.token;
  const id = req.params.id;
  isConnected(token).then(_ => {
    return db.getDevice(id).then(device => {
      res.status(200).json({message: 'success', device: device})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});

/**
 * API to remove a device to the favs of a user
 * request body:
 *  - id: _
 *  - userID: _
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} id the room id where to user will be added
 *  @param {String} userID the user id of the user to be added to the room
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                        err.message in case of invalid token and 500 otherwise.
 *
 */
app.delete('/fav', (req, res) => {
  if (!(req.body.hasOwnProperty('token') && req.body.hasOwnProperty('userID') && req.body.hasOwnProperty('id'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.body.token;
  const id = req.body.id;
  const userID = req.body.userID;
  isConnected(token).then(_ => {
    return db.deleteFav(userID, id).then(_ => {
      res.status(200).json({message: 'success'})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});

/**
 * API to add a device to the favs of a user
 * request body:
 *  - id:
 *  - userID: _
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} id the room id where to user will be added
 *  @param {String} userID the user id of the user to be added to the room
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                        err.message in case of invalid token and 500 otherwise.
 *
 */
app.post('/fav', (req, res) => {
  if (!(req.body.hasOwnProperty('token') && req.body.hasOwnProperty('userID') && req.body.hasOwnProperty('id'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.body.token;
  const userID = req.body.userID;
  const id = req.body.id;
  isConnected(token).then(_ => {
    return db.addFav(userID, id).then(_ => {
      res.status(200).json({message: 'success'})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});

/**
 * API to verify if a device is in the favs of a user.
 * request params:
 *  - id: _
 *  - userID: _
 *
 * request query:
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} id the room id where to user will be added
 *  @param {String} userID the user id of the user to be added to the room
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                        err.message in case of invalid token and 500 otherwise.
 *
 */
app.get('/fav/device/:id/user/:userID', (req, res) => {
  if (!(req.params.hasOwnProperty('id') && req.params.hasOwnProperty('userID') && req.query.hasOwnProperty('token'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.query.token;
  const userID = req.params.userID;
  const id = req.params.id;
  isConnected(token).then(_ => {
    db.isFav(userID, id).then(isfav => {
      res.status(200).json({message: 'success', isfav: isfav})
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
