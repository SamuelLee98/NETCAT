const jwt = require('jsonwebtoken');
const config = require('config');

const userAuth = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'You must be logged in to perform this action' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ msg: 'You must be logged in to perform this action' });
  }
};

const adminAuth = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'You must be logged in to perform this action' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Check if admin
    if (!decoded.user.admin) {
      return res
        .status(401)
        .json({ msg: 'You do not have the permission to perform this action' });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ msg: 'You must be logged in to perform this action' });
  }
};

module.exports = {
  userAuth,
  adminAuth
};
