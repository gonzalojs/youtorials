const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const passport = require('passport')

const app = express()

//middlewares
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

//use the passport middleware
app.use(passport.initialize())
// Bring in the Passport Strategy
require('./config/passport')(passport)

//bring keys
const db = require('./config/keys').mongoURL
mongoose.connect(db, { useNewUrlParser: true })
.then(() => {
  console.log(`Database connected successfully ${db}`)
})
.catch(err => {
  console.error(err.message)
})

const users = require('./routes/api/users')
app.use('/api/users', users)


const PORT = process.env.PORT || 5000

/* app.get('/', (req, res) => {
  return res.send('Hello Mundo')
}) */

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

module.exports = app