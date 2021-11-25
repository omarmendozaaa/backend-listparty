const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('./../Models/User')

router.get('/', async (request, response) => {
  const users = await User.find({}).populate({
    path: 'eventos',
    populate: {
      path: 'eventoid'
    }
  })
  response.json(users)
})

router.post('/', async (request, response, next) => {
  const { body } = request
  const { username, password, nombre, apellido } = body
  const saltRounds = 10
  const passwordHash = await bcrypt.hashSync(password, saltRounds)
  const user = new User({
    username,
    nombre,
    apellido,
    passwordHash: passwordHash
  })
  await user.save().then(savedUser => {
    response.json(savedUser)
  }).catch(err => {
    response.status(400).send({
      error: 'El usuario tiene que ser único'
    })
    next(err)
  }
  )
})

module.exports = router
