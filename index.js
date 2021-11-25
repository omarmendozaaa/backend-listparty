require('./mongo') // Conecta a la base de datos

const express = require('express')
const invitadosRoutes = require('./src/Controllers/Invitados')
const eventosRoutes = require('./src/Controllers/Eventos')
const userRoutes = require('./src/Controllers/Users')
const loginRoutes = require('./src/Controllers/Login')
const cors = require('cors')

const NotFound = require('./middleware/NotFound')
const BadRequest = require('./middleware/BadRequest')
const HandleErrors = require('./middleware/HandleErrors')
const userExtractor = require('./middleware/userExtractor')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/invitados', userExtractor, invitadosRoutes)
app.use('/api/eventos', userExtractor, eventosRoutes)
app.use('/api/users', userRoutes)
app.use('/api/login', loginRoutes)

app.use(HandleErrors)
app.use(NotFound)
app.use(BadRequest)
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
