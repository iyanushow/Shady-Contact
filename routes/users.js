const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

// ROUTER DEFINITION
const router = express.Router();

// INDEX ROUTE GET api/contacts
// @desc  register a user
// @access public
router.post(
  '/',
  [
    //DATA VALIDATION WITH EXPRESS VALIDATOR
    check('firstName', 'Please enter your name').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Password is too short, enter 8 charaters or more'
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    console.log(req)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, password } = req.body;

    // CHECK IF USER ALREADY EXISTS
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ msg: ' A user with this email already exists' });
      }

      user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      // PASSWORD ENCRYPTION WITH BCRYPT
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // CREATE JWT TOKEN
      // CREATE PAYLOAD
      const payload = {
        user: {
          id: user._id,
        },
      };

      // SIGN THE TOKEN
      jwt.sign(
        payload,
        config.get('jwtsecret'),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) {
            throw err.message;
          }

          // RETURN TOKEN
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  }
);

module.exports = router;
