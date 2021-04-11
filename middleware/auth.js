const config = require('config');
const { verify } = require('jsonwebtoken');

exports.reqToken = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  try {
    const decoded = verify(token, config.get('jwtsecret'));
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
