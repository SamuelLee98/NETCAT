const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatalogueSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  events: [
    {
      eventId: {
        type: Schema.Types.ObjectId,
        ref: 'events'
      },
      eventDate: {
        type: Date
      },
      dateAdded: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Catalogue = mongoose.model('catalogue', CatalogueSchema);
