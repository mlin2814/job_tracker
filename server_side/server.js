require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const jobsRoutes = require('./routes/jobs')
const contactsRoutes = require('./routes/contacts')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
// app.get('/', (req, res) => {
//   res.json({message: 'Welcome to the app'})
// })
app.use('/jobs', jobsRoutes)
app.use('/contacts', contactsRoutes)


// connect to db
mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })