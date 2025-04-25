const jwt = require('jsonwebtoken');

const  validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];
console.log(token);

  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); 
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = validateToken;
