const viewDescriptor = {
  views: {
    all_users: {
      map: function (doc) {
        if (doc.password) {
          emit(doc._id, doc)
        }
      }
    }
  }
};

module.exports = {viewDescriptor};