const {
  Router
} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
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



module.exports = router