/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const jobsRoutes = require('./routes/jobs')
const skillsRoutes = require('./routes/skills')
const contactsRoutes = require('./routes/contacts')
const userRoutes = require('./routes/user')

const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Routes
app.use('/jobs', jobsRoutes)
app.use('/skills', skillsRoutes)
app.use('/contacts', contactsRoutes)
app.use('/user', userRoutes)


// Connect to DB
mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log('Connected to DB')
    app.listen(process.env.PORT, () => {
      console.log('Listening on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })