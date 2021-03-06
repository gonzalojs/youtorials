const {
  Router
} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const key = require('../../config/keys').secret
const User = require('../../models/User')



/**
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */

router.post('/register', (req, res) => {
  let {
    name,
    username,
    email,
    password,
    confirm_password
  } = req.body
  if (password !== confirm_password) {
    return res.status(400).json({
      msg: 'Password do not match'
    })
  }
  //check for unique username
  User.findOne({
    username: username
  }).then(user => {
    if (user) {
      return res.status(400).json({
        msg: 'Username is already taken'
      })
    }
  })
  //check for unique email
  User.findOne({
      email: email
    })
    .then(user => {
      if (user) {
        return res.status(400).json({
          msg: 'Email is already in use'
        })
      }
    })
  // the data is valid and we can register the user
  let newUser = new User({
    name,
    username,
    password,
    email
  })
  // Hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser.password = hash
      newUser.save().then(user => {
        return res.status(201).json({
          success: true,
          msg: 'User was created'
        })
      })
    })
  })
})


/**
 * @route POST api/users/login
 * @desc Signing the User
 * @access Public
 */

router.post('/login', (req, res) => {
  User.findOne({
    username: req.body.username
  }).then(user => {
    if (!user) {
      return res.status(404).json({
        msg: 'Username was not found',
        success: false
      })
    }
    //if there is user, we compare the password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        //User's password is correct and we need to send the JSON token for that user
        const payload = {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email
        }
        jwt.sign(payload, key, {
          expiresIn: 604800
        }, (err, token) => {
          res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            user: user,
            msg: 'You are now logged in'
          })
        })

      } else {
        return res.status(404).json({
          msg: 'Incorrect Password',
          success: false
        })
      }
    })
  })
})

/**
 * @route POST api/users/profile
 * @desc Return the user's data
 * @access Private
 */

router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  return res.json({
    user: req.user
  })
})

module.exports = router