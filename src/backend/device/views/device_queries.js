const viewDescriptor = {
    views: {
        devices_room: {
            map: function(doc) {
                if (doc.roomID && doc.deviceID && doc.type === 'owner') {
                    emit(doc.roomID, doc)
                }
            }
        },
        fav_devices: {
            map: function(doc) {
                if (doc.userID && doc.deviceID && doc.type === 'fav') {
                    emit(doc.userID, doc)
                }
            }
        },
        all_devices: {
            map: function(doc) {
                if (doc.device) {
                    emit(doc.device.deviceID, doc)
                }
            }
        }
    }
};

module.exports = {viewDescriptor};