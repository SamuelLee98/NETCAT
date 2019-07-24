const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Catalogue = require('../../models/Catalogue');
const User = require('../../models/User');

// @route   POST api/catalogue/:id
// @desc    Add an event to catalogue
// @access  Private
router.post('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(400).json({ msg: 'Event not found' });
    }

    // Get the current user's catalogue
    let catalogue = await Catalogue.findOne({ user: req.user.id });

    // If catalogue already exist, check if event is already added to catalogue
    if (catalogue) {
      if (
        catalogue.events.filter(
          event => event.eventId.toString() === req.params.id
        ).length > 0
      ) {
        return res
          .status(400)
          .json({ msg: 'Event already added to your catalogue' });
      }

      catalogue.events.unshift({
        eventId: req.params.id,
        eventDate: event.date.from
      });

      await catalogue.save();

      return res.json(catalogue);
    }

    // If catalogue list does not exist
    const catalogueFields = {
      user: req.user.id,
      events: [
        {
          eventId: req.params.id,
          eventDate: event.date.from
        }
      ]
    };

    catalogue = new Catalogue(catalogueFields);
    await catalogue.save();
    return res.json(catalogue);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/catalogue
// @desc    Get all events in current users catalogue
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const catalogue = await Catalogue.findOne({ user: req.user.id });
    if (!catalogue) {
      return res.json([]);
    }
    const catalogueEvents = catalogue.events.sort(
      (eventA, eventB) =>
        new Date(eventA.eventDate) - new Date(eventB.eventDate)
    );
    res.json(catalogueEvents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/catalogue/:id
// @desc    Delete event from catalogue
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Get the current user's catalogue
    let catalogue = await Catalogue.findOne({ user: req.user.id });

    if (!catalogue) {
      return res
        .status(404)
        .json({ msg: 'This event has not yet been added to your catalogue' });
    }

    // If event is not in catalogue
    if (
      catalogue.events.filter(
        event => event.eventId.toString() === req.params.id
      ).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'This event has not yet been added to your catalogue' });
    }

    // Get remove index
    const removeIndex = catalogue.events
      .map(event => event.eventId.toString())
      .indexOf(req.params.id);

    catalogue.events.splice(removeIndex, 1);

    await catalogue.save();

    res.json(catalogue);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
