const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://hysteria:kRAJ3hwxcVEJ66D@cluster0.9kals.mongodb.net/partydb?retryWrites=true&w=majority'

// conexion a mongodb
mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })
