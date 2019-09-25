const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const Doc = require('./models/Docs')
const User = require('./models/User')

const PORT = 3000

mongoose.connect('mongodb://localhost/mongoosential', {
  useNewUrlParser: true
}, (err) => {
  if(!err)
    console.log('Server has been connected')
})

app.listen(PORT, () => {
  console.log('App running on port 3000')
})