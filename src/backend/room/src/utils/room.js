const db = require('nano')(process.env.DB_URL);

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

module.exports = {
    getRoom
};
