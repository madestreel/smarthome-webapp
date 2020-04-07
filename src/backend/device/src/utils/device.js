const db = require('nano')(process.env.DB_URL);

function createDevice(device) {
    return new Promise(((resolve, reject) => {
        db.insert(
            {device: device},
            device.deviceID,
            (error, success) => {
                if (success) {
                    resolve()
                } else {
                    reject(new Error(`Failed to create device. Reason: ${error.reason}`))
                }
            }
        )
    }))
}

function getDevice(deviceID) {
    return new Promise((resolve, reject) => {
        db.get(deviceID, (error, success) => {
            if (success) resolve(success);
            else reject(new Error(`Could not retrieve device (${deviceID}). Reason: ${error.reason}`))
        })
    })
}

function getDevices() {
    return new Promise((resolve, reject) => {
        db.view('queries', 'all_devices', function (err, body) {
            if (!err) {
                resolve(body.rows.map(device => device.value))
            } else {
                reject(new Error(`Failed to get devices. Reason: ${err.message}`))
            }
        })
    })

}

function getDevicesForRoom(roomID) {
    return new Promise((resolve, reject) => {
        db.view('queries', 'devices_room', {key: roomID}, function (err, body) {
            if (!err) {
                resolve(body.rows.map(device => device.value.deviceID));
            } else {
                reject(new Error(`could not retrieve devices of room (${roomID}). Reason ${err.message}`))
            }
        })
    })
}

function isFav(userID, deviceID) {
    return new Promise((resolve, reject) => {
        db.view('queries', 'fav_devices', {key: userID}, function(err, body) {
            if (!err) {
                const isfav = body.rows.some(device => device.value.deviceID === deviceID);
                resolve(isfav)
            } else {
                reject(new Error(`Failed to check if fav. Reason: ${err.reason}`))
            }
        })
    })
}

function addFav(userID, deviceID) {
    return new Promise(((resolve, reject) => {
        db.get(deviceID, (error, success) => {
            if (success) {
                db.insert(
                    {
                        userID: userID,
                        deviceID: deviceID,
                        type: 'fav'
                    },
                    (error, success) => {
                        if (success) resolve();
                        else reject(new Error(`Failed to add device to fav of user. Reason ${error.reason}`))
                    }
                )
            } else {
                reject(new Error(`Device does not exist`))
            }
        })
    }))
}

function deleteFav(userID, deviceID) {
    return new Promise(((resolve, reject) => {
        db.view('queries', 'fav_devices', {key: userID}, function(err, body) {
            const device = body.rows.find(device => device.value.deviceID === deviceID);
            if (!err && device) {
                db.destroy(device.value._id, device.value._rev, (err, success) => {
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

function deleteDeviceOfRoom(deviceID, roomID) {
    return new Promise((resolve, reject) => {
        db.view('queries', 'devices_room', {key: roomID}, function(err, body) {
            const device = body.rows.find(device => device.value.deviceID === deviceID);
            if (!err && device) {
                db.destroy(device.value._id, device.value._rev, (err, success) => {
                    if (success) resolve();
                    else reject(new Error(`Failed to delete device from room. Reason: ${err.reason}`))
                })
            } else {
                resolve()
            }
        })
    })
}

function addDeviceToRoom(deviceID, roomID) {
    return new Promise((resolve, reject) => {
        db.insert(
            {
                deviceID: deviceID,
                roomID: roomID,
                type: 'owner'
            },
            deviceID + roomID,
            (error, success) => {
                if (success) resolve();
                else reject(new Error(`Failed to add device to room. Reason ${error.reason}`))
            }
        )
    })
}

module.exports = {
    createDevice,
    isFav,
    addFav,
    deleteFav,
    getDevice,
    getDevices,
    getDevicesForRoom,
    deleteDeviceOfRoom,
    addDeviceToRoom
};