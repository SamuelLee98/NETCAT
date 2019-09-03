const express = require('express');
const router = express.Router();
const { userAuth } = require('../../middleware/auth');
const { validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Catalogue = require('../../models/Catalogue');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', userAuth, async (req, res) => {
  try {
    // Populate: add 'name' and 'avatar' fields from user schema to the current query
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['username', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.err(err.msg);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', userAuth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    school,
    degree,
    fieldofstudy,
    location,
    bio,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  // Build education object
  profileFields.education = {};
  if (school) profileFields.education.school = school;
  if (degree) profileFields.education.degree = degree;
  if (fieldofstudy) profileFields.education.fieldofstudy = fieldofstudy;
  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // Update if profile already exists
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id }, // find correct profile by user id
        { $set: profileFields }, // invoke the `set` option to rewrite the entire profile record
        { new: true }
      );

      return res.json(profile);
    }

    // Create new profile
    profile = new Profile(profileFields);

    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);

    // If :user_id has invalid format, a error will be produced.
    // We do not want to send server error but instead send profile not found
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    Delete current user's profile, user & catalogue
// @access  Private
router.delete('/', userAuth, async (req, res) => {
  try {
    // Remove catalogue
    await Catalogue.findOneAndRemove({
      user: req.user.id
    });
    // Remove profile
    await Profile.findOneAndRemove({
      user: req.user.id
    });
    // Remove user
    await User.findOneAndRemove({
      _id: req.user.id
    });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    // If :user_id has invalid format, a error will be produced.
    // We do not want to send server error but instead of send Profile not found
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
