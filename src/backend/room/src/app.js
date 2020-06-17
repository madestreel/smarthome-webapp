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

function isValidRoom(room) {
  return room.hasOwnProperty('permission')
}

/**
 * API to get a room
 * request params:
 *  - roomID: _
 *
 * request query:
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} roomID the room id to retrieve
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                         err.message in case of invalid token and 500 otherwise.
 *  @returns {Room} In case of success the room is returned.
 *
 *  @see isValidRoom for the representation of the Room object.
 */
app.get('/room/:roomID', (req, res) => {
  if (!(req.params.hasOwnProperty('roomID') && req.query.hasOwnProperty('token'))) {
    return res.status(400).json({status: 'invalid request'})
  }
  let room = req.params.roomID;
  let token = req.query.token;
  isConnected(token).then(_ => {
    return db.getRoom(room).then(room => {
      res.status(200).json({room: room.room})
    }).catch(err => {
      res.status(500).json({message: String(err)})
    })
  }).catch(err => {
    res.status(err.message).json()
  })
});

/**
 * API to get the rooms of a user
 * request params:
 *  - user: _
 *
 *  request query:
 *    -token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} user the user from which to get the rooms
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                        err.message in case of invalid token and 500 otherwise.
 *
 *  @returns {List[string]} In case of success the ids of the rooms for the user
 *
 *  @see isValidRoom for the representation of the Room object.
 */
app.get('/rooms/:user', (req, res) => {
  if (!(req.params.hasOwnProperty('user') && req.query.hasOwnProperty('token'))) {
    return res.status(400).json({status: 'invalid request'})
  }
  let user = req.params.user;
  let token = req.query.token;
  isConnected(token).then(_ => {
    return db.getRoomsForUser(user).then(rooms => {
      res.status(200).json({rooms: rooms})
    }).catch(err => {
      res.status(500).json({message: String(err)})
    })
  }).catch(err => {
    res.status(err.message).json()
  })
});


/**
 * API to create a new room
 * request body:
 *  - room:
 *    - permission: _
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {Room} room the room to be created
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                        err.message in case of invalid token and 500 otherwise.
 *
 *  @see isValidRoom for the representation of the Room object.
 */
app.post('/room', (req, res) => {
  log(req.body);
  console.log(req.body);
  if (!(req.body.hasOwnProperty('token') && req.body.hasOwnProperty('room') && isValidRoom(req.body.room))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.body.token;
  const room = req.body.room;

  isConnected(token).then(_ => {
    return db.createRoom(room).then(_ => {
      res.status(200).json({message: 'room successfully created'})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});


/**
 * API to add a user to a room
 * request body:
 *  - roomID:
 *  - userID: _
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} roomID the room id where to user will be added
 *  @param {String} userID the user id of the user to be added to the room
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                        err.message in case of invalid token and 500 otherwise.
 *
 */
app.post('/user', (req, res) => {
  console.log(req.body);
  if (!(req.body.hasOwnProperty('token') && req.body.hasOwnProperty('userID') && req.body.hasOwnProperty('roomID'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.body.token;
  const userID = req.body.userID;
  const roomID = req.body.roomID;
  isConnected(token).then(_ => {
    return db.addUserToRoom(userID, roomID).then(_ => {
      res.status(200).json({message: `user (${userID}) successfully added to room (${roomID})`})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  });
});


/**
 * API to delete a user from a room
 * request body:
 *  - roomID:
 *  - userID: _
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} roomID the room id where to user will be added
 *  @param {String} userID the user id of the user to be added to the room
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                        err.message in case of invalid token and 500 otherwise.
 *
 */
app.delete('/user', (req, res) => {
  if (!(req.body.hasOwnProperty('token') && req.body.hasOwnProperty('userID') && req.body.hasOwnProperty('roomID'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.body.token;
  const userID = req.body.userID;
  const roomID = req.body.roomID;

  isConnected(token).then(_ => {
    return db.deleteUserOfRoom(userID, roomID).then(_ => {
      res.status(200).json({message: 'success'})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});

/**
 * API to add a room to the favs of a user
 * request body:
 *  - roomID:
 *  - userID: _
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} roomID the room id where to user will be added
 *  @param {String} userID the user id of the user to be added to the room
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                        err.message in case of invalid token and 500 otherwise.
 *
 */
app.post('/fav', (req, res) => {
  if (!(req.body.hasOwnProperty('token') && req.body.hasOwnProperty('userID') && req.body.hasOwnProperty('roomID'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.body.token;
  const userID = req.body.userID;
  const roomID = req.body.roomID;
  isConnected(token).then(_ => {
    return db.addFav(userID, roomID).then(_ => {
      res.status(200).json({message: 'success'})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});


/**
 * API to remove a room to the favs of a user
 * request body:
 *  - roomID: _
 *  - userID: _
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} roomID the room id where to user will be added
 *  @param {String} userID the user id of the user to be added to the room
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                        err.message in case of invalid token and 500 otherwise.
 *
 */
app.delete('/fav', (req, res) => {
  if (!(req.body.hasOwnProperty('token') && req.body.hasOwnProperty('userID') && req.body.hasOwnProperty('roomID'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.body.token;
  const roomID = req.body.roomID;
  const userID = req.body.userID;
  isConnected(token).then(_ => {
    return db.deleteFav(userID, roomID).then(_ => {
      res.status(200).json({message: 'success'})
    }).catch(err => {
      res.status(500).json({message: err.message})
    })
  }).catch(err => {
    res.status(err.message).json({message: 'permission denied'})
  })
});


/**
 * API to verify if a room is in the favs of a user.
 * request params:
 *  - roomID: _
 *  - userID: _
 *
 * request query:
 *  - token: _
 *
 *  @param {String} token the token to be checked
 *  @param {String} roomID the room id where to user will be added
 *  @param {String} userID the user id of the user to be added to the room
 *
 *  @returns {status code} 200 in case of success, 400 in case of missing params,
 *                        err.message in case of invalid token and 500 otherwise.
 *
 */
app.get('/fav/room/:roomID/user/:userID', (req, res) => {
  if (!(req.params.hasOwnProperty('roomID') && req.params.hasOwnProperty('userID') && req.query.hasOwnProperty('token'))) {
    res.status(400).json({message: 'bad request'});
    return
  }

  const token = req.query.token;
  const userID = req.params.userID;
  const roomID = req.params.roomID;
  isConnected(token).then(_ => {
    db.isFav(userID, roomID).then(isfav => {
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
