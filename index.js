require('./mongo') // Conecta a la base de datos

const express = require('express')
const invitadosRoutes = require('./src/Controllers/Invitados')
const eventosRoutes = require('./src/Controllers/Eventos')
const userRoutes = require('./src/Controllers/Users')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/invitados', invitadosRoutes)
app.use('/api/eventos', eventosRoutes)
app.use('/api/users', userRoutes)

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

app.use((error, request, response, next) => {
  console.log(error.name)
  response.status(400).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
