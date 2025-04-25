const authorizeRole = (userRole) => {
    return (req, res, next) => {
      console.log(req.user.role, userRole);
        if (req.user.role !== userRole) {
          return res.status(405).json({ message: 'Access denied' });
        }
        next();
      };
}
module.exports = authorizeRole;