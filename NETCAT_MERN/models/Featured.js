const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featuredSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    room: {
      type: String
    },
    address: {
      type: String
    },
    longitude: {
      type: Number
    },
    latitude: {
      type: Number
    }
  },
  date: {
    multiDay: {
      type: Boolean,
      default: false
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
      required: true
    }
  },
  description: {
    type: String
  },
  thumbNailUrl: {
    type: String
  },
  school: {
    type: String
  },
  featured: {
    type: Boolean,
    default: true
  },
  type: {
    type: String
  },
  rsvpLink: {
    type: String
  }
});

module.exports = Featured = mongoose.model('featuredevent', featuredSchema);
