const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('./../Models/User')

router.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body
  const saltRounds = 10
  const passwordHash = await bcrypt.hashSync(password, saltRounds)
  const user = new User({
    username,
    passwordHash: passwordHash
  })
  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = router
