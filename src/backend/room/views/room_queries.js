const viewDescriptor = {
  views: {
      users_room: {
          map: function(doc) {
              if (doc.roomID && doc.userID && doc.type === 'owner') {
                  emit(doc.userID, doc)
              }
          }
      },
      fav_rooms: {
          map: function(doc) {
              if (doc.type === 'fav' && doc.roomID && doc.userID) {
                  emit(doc.userID, doc)
              }
          }
      }
  }
};

module.exports = {viewDescriptor};