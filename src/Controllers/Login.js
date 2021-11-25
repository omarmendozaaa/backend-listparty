const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('./../Models/User')

router.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username }).populate({
    path: 'eventos',
    populate: {
      path: 'evento'
    }
  })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'Usuario o contraseña invalidos'
    })
  } else {
    const userForToken = {
      id: user._id
    }
    const token = jwt.sign(userForToken, process.env.JSON_SECRET)

    response.send({
      username: user.username,
      nombre: user.nombre,
      apellido: user.apellido,
      eventos: user.eventos,
      token: token
    })
  }
})

module.exports = router
