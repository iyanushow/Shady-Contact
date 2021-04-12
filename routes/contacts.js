const express = require('express');
const router = express.Router();
const { reqToken } = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Contact = require('../models/Contacts');
// INDEX ROUTE  GET api/contacts
// @desc  get a particular users contact
// @access private
router.get('/', reqToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);

    res.status(500).status({ msg: 'server error' });
  }
});

// CREATE ROUTE  POST api/contacts
// @desc  create a contatct
// @access private
router.post(
  '/',
  [reqToken, [check('firstName', 'Please enter a name').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, phoneNo, type } = req.body;

    try {
      const newContact = new Contact({
        firstName,
        lastName,
        email,
        phoneNo,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.log(err.message);
      res.status(500).status({ msg: 'server error' });
    }
  }
);

// SHOW ROUTE  GET api/contacts/:id
// @desc  show a particular contact
// @access private
router.get('/:id', reqToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    const [namedContact] = contacts.filter((contact) => {
      return contact.id === req.params.id;
    });

    if (namedContact) {
      return res.json(namedContact);
    } else {
      res.status(404).json({ msg: 'Contact does not exist' });
    }
  } catch (err) {
    console.log(err.message);

    res.status(500).status({ msg: 'server error' });
  }
});

// UPDATE ROUTE
// @desc  edit a contatct
// @access private
router.put('/:id', reqToken, async (req, res) => {
  const { firstName, lastName, email, phoneNo, type } = req.body;

  // BUILD CONTACT OBJECT
  const contactFields = {};
  if (firstName) contactFields.firstName = firstName;
  if (lastName) contactFields.lastName = lastName;
  if (email) contactFields.email = email;
  if (phoneNo) contactFields.phoneNo = phoneNo;
  if (type) contactFields.type = type;
  console.log(contactFields);
  console.log('####################');

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    if (contact.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'Not Authorized, Not your contact' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    console.log('success');
    res.json(contact);
  } catch (err) {
    console.log(err.message);

    res.status(500).status({ msg: 'server error' });
  }
});

// DESTROY ROUTE  DELETE api/contacts/:id
// @desc  delete a contatct
// @access private
router.delete('/:id', reqToken, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    if (contact.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'Not Authorized, Not your contact' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    console.log('success');
    res.json({ msg: 'Contact successfully removed' });
  } catch (err) {
    console.log(err.message);

    res.status(500).status({ msg: 'server error' });
  }
});

module.exports = router;
