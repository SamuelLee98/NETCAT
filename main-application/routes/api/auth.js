const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { userAuth } = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Find user by id
// @access  Public
router.get('/', userAuth, async (req, res) => {
  try {
    // Return all data associated with user except for password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Login user & get token
// @access  Public
router.post(
  '/',
  [
    // Only need to check email and password during login
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Send 400 bad request with error as json
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if email matches to existing user
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Check if password and email are correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Return jsonwebtoken
      // Set up payload. This info would be encrypted and stored in a token
      const payload = {
        user: {
          id: user.id,
          admin: user.admin
        }
      };

      // Encrypt user id and return corresponding token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 }, // 1 hours
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
