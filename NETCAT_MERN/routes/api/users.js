const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Send 400 bad request with error as json
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email: email });
      if (user) {
        // The returned error should look similar to the validation error
        // before ie. array of errors
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', // size
        r: 'pg', // rating, ie. no naked people
        d: 'mm' // default value if no avatar available
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10); // Generate salt for encryption
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // Await eliminates the need to write
      // bcrypt.genSalt(10).then(
      //   () => { brypt.hash(...) })
      // Due to the await keyword, we would first generate salt, then hash it,
      // then save it to the database
      // Rule of thumb: put await in front of anything that returns a promise

      // Return jsonwebtoken

      // Set up payload. This info would be encrypted and stored in a token
      const payload = {
        user: {
          id: user.id // user._id from mongodb
        }
      };

      // Encrypt user id and return corresponding token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
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
