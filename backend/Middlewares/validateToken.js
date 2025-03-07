const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from Authorization header

  if (token == null) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // Add user data to request
    next(); // Proceed to the next middleware
  });
};

module.exports = validateToken;
