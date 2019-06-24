const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator/check');
const Event = require('../../models/Event');
const Featured = require('../../models/Featured');

// @route   GET api/events/
// @desc    Get NORMAL events by school or/and type
// @access  Public
router.get('/', async (req, res) => {
  try {
    let school = req.query.school;
    let type = req.query.type;
    console.log(school, type);

    let events;
    if (school && type) {
      events = await Event.find({ school, type }).sort({
        'date.from': -1
      });
    } else if (school) {
      events = await Event.find({ school }).sort({ 'date.from': -1 });
    } else if (type) {
      events = await Event.find({ type }).sort({ 'date.from': -1 });
    } else {
      events = await Event.find().sort({ 'date.from': -1 });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/events/featured
// @desc    Get FEATURED events by school or/and type
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    let school = req.query.school;
    let type = req.query.type;

    let events;
    if (school && type) {
      events = await Featured.find({ school, type }).sort({
        'date.from': -1
      });
    } else if (school) {
      events = await Featured.find({ school }).sort({ 'date.from': -1 });
    } else if (type) {
      events = await Featured.find({ type }).sort({ 'date.from': -1 });
    } else {
      events = await Featured.find().sort({ 'date.from': -1 });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/events
// @desc    Create a NORMAL or FEATURED event
// @access  Developer

/**
 * TODO: Change permission level to developer
 */
router.post(
  '/',
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('date.from', "Invalid 'from' date format").isISO8601(),
    body('date').custom(value => {
      // If multiDay exists and is true
      if (value.multiDay && value.multiDay === true) {
        // If to field is empty or is not a valid datem throw invalid date error
        if (!value.to || !Date.parse(value.to)) {
          throw new Error("Invalid 'to' date format");
        }
      }
      return true;
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      location,
      date,
      description,
      thumbNailUrl,
      school,
      featured,
      type,
      rsvpLink
    } = req.body;

    const eventFields = {
      title,
      location,
      date,
      description,
      thumbNailUrl,
      school,
      type,
      rsvpLink
    };

    try {
      let newEvent;
      // If featured field exists and is true, then it is a featured event
      featured && featured === true
        ? (newEvent = new Featured(eventFields))
        : (newEvent = new Event(eventFields));

      newEvent = await newEvent.save();
      res.json(newEvent);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
