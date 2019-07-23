const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    // Reference to User model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  education: {
    type: {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      }
    },
    required: false
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
