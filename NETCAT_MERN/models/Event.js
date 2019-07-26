const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// function isMultiDay() {
//   if (this.date.multiDay) return true;
//   return false;
// }

const eventSchema = new Schema({
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
    type: {
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
    required: true
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
    default: false
  },
  type: {
    type: String
  },
  rsvpLink: {
    type: String
  }
});

module.exports = Event = mongoose.model('event', eventSchema);
