const config = require('config');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');
const { reqToken } = require('../middleware/auth');

const router = express.Router();
// INDEX ROUTE POST api/auth
// @desc  POST log CREDS
// @access private
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter your password').exists(),
  ],
  async (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      return res.status(400).json({
        errors: validation.array(),
      });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: ' Invalid Credentials, please check your details' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: ' Invalid Credentials, please check your details' });
      }

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

// INDEX ROUTE GET api/auth
// @desc  GET LOGGED IN USER
// @access public
router.get('/', reqToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
  }
});

module.exports = router;
