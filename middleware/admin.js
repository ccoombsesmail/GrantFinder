const User = require('../models/User');

const requiresAdmin = () => {

  return [
    (req, res, next) => {
        const { username } = req.body.grant
        User.findOne({ username: username }).then((user) => {
          if (!user) {
            return res.status(404).json({ email: 'This user does not exist' });
          }
          if (user.isAdmin === true) { 
            next();
          } else {
            res.status(401).send('Unauthorized');
          }
      })
    }
  ]
}

module.exports = requiresAdmin