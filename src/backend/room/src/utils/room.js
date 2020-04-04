const db = require('nano')(process.env.DB_URL);
const log = require('debug')(process.env.SERVICE_NAME);

function getRoom(room) {
    return new Promise((resolve, reject) => {
        db.get(room, (error, success) => {
            if (success) {
                resolve(success)
            } else {
                reject(new Error(`Could not retrieve room (${room}).`))
            }
        })
    })
}

function getRoomsForUser(user) {
    return new Promise((resolve, reject) => {
        db.view('queries', 'users_room', {key: user}, function (err, body) {
            if (!err) {
                resolve(body.rows.map(room => room.value.roomID));
            } else {
                reject(new Error(`could not retrieve rooms of user (${user}). Reason ${err.message}`))
            }
        })
    })
}

function createRoom(room) {
    return new Promise(((resolve, reject) => {
        db.insert(
            {room: room},
            (error, success) => {
                if (success) resolve();
                else reject(new Error(`Failed to create new room. Reason ${error.reason}`))
            }
        )
    }))
}

function addUserToRoom(userID, roomID) {
    return new Promise((resolve, reject) => {
        db.insert(
            {
                userID: userID,
                roomID: roomID,
                type: 'owner'
            },
            (error, success) => {
                if (success) resolve();
                else reject(new Error(`Failed to add user to room. Reason ${error.reason}`))
            }
        )
    })
}

function addFav(userID, roomID) {
    return new Promise(((resolve, reject) => {
        db.view('queries', 'users_room', {key: userID}, function(err, body) {
            if (!err && body.rows.some(room => room.value.roomID === roomID)) {
                db.insert(
                    {
                        userID: userID,
                        roomID: roomID,
                        type: 'fav'
                    },
                    (error, success) => {
                        if (success) resolve();
                        else reject(new Error(`Failed to add room to fav of user. Reason ${error.reason}`))
                    }
                )
            } else {
                reject(new Error(`You are not owner of this room.`))
            }
        })
    }))
}

function deleteFav(userID, roomID) {
    return new Promise(((resolve, reject) => {
        db.view('queries', 'fav_rooms', {key: userID}, function(err, body) {
            const room = body.rows.find(room => room.value.roomID === roomID);
            if (!err && room) {
                db.destroy(room.value._id, room.value._rev, (err, success) => {
                    if (success) {
                        resolve()
                    } else {
                        reject(new Error(`Failed to delete fav. Reason: ${err.reason}`))
                    }
                })
            } else {
                resolve()
            }
        })
    }))
}

function isFav(userID, roomID) {
    return new Promise((resolve, reject) => {
        db.view('queries', 'fav_rooms', {key: userID}, function(err, body) {
            if (!err) {
                const isfav = body.rows.some(room => room.value.roomID === roomID);
                resolve(isfav)
            } else {
                reject(new Error(`Failed to check if fav. Reason: ${err.reason}`))
            }
        })
    })
}

function deleteUserOfRoom(userID, roomID) {
    return new Promise((resolve, reject) => {
        db.view('queries', 'users_room', {key: userID}, function(err, body) {
            const room = body.rows.find(room => room.value.roomID === roomID);
            if (!err && room) {
                db.destroy(room.value._id, room.value._rev, (err, success) => {
                    if (success) resolve();
                    else reject(new Error(`Failed to delete user from room. Reason: ${err.reason}`))
                })
            } else {
                resolve()
            }
        })
    })
}

module.exports = {
    getRoom,
    getRoomsForUser,
    createRoom,
    addUserToRoom,
    addFav,
    deleteFav,
    isFav,
    deleteUserOfRoom
};
