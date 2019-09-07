const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const app = express()

//middlewares
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

//bring keys
const db = require('./config/keys').mongoURL
mongoose.connect(db, { useNewUrlParser: true })
.then(() => {
  console.log(`Database connected successfully ${db}`)
})
.catch(err => {
  console.error(err.message)
})
const PORT = process.env.PORT || 5000

/* app.get('/', (req, res) => {
  return res.send('Hello Mundo')
}) */

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

module.exports = app