const bcrypt = require('bcryptjs');
const User = require('../models/User');
const validateLoginInput = require('../validation/login');

const requiresAdmin = () => {

  return [
    (req, res, next) => {
        const { username } = req.body
        User.findOne({ username: username }).then((user) => {
          if (!user) {
            return res.status(404).json({ email: 'This user does not exist' });
          }
          // bcrypt.compare(password, user.password)
          //   .then((isMatch) => {
              if (user.isAdmin === true) { 
                next();
              } else {
                res.status(401).send('Unauthorized');
              }
        // })
      })
    }
  ]
}

module.exports = requiresAdmin