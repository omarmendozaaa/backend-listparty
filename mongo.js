const mongoose = require('mongoose')
const connectionString = process.env.DB_CONECTION_STRING

// conexion a mongodb
mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })
