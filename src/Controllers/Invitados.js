const express = require('express')
const router = express.Router()
const Invitado = require('./../Models/Invitado')

router.get('/', (request, response) => {
  Invitado.find({}).then(invitados => {
    response.json(invitados)
  })
})

router.get('/:id', (request, response) => {
  const id = Number(request.params.id)
  const invitado = Invitado.findone((invitado) => invitado.id === id)
  invitado ? response.json(invitado) : response.status(404).end()
})

router.post('/', (request, response) => {
  const body = request.body

  const invitado = {
    idevento: 1,
    nombre: body.nombre,
    apellido: body.apellido,
    asistencia: false,
    enlafiesta: false
  }

  invitados = invitados.concat(invitado)
  response.json(invitado)
})

router.put('/:id', (request, response) => {
  const body = request.body
  const id = Number(request.params.id)
  const invitado = invitados.find((invitado) => invitado.id === id)

  invitado.nombre = body.nombre
  invitado.apellido = body.apellido
  invitado.asistencia = body.asistencia
  invitado.enlafiesta = body.enlafiesta
  invitado.qr = body.qr

  invitado ? response.json(invitado) : response.status(404).end()
})

router.delete('/:id', (request, response) => {
  const id = Number(request.params.id)
  invitados = invitados.filter((invitado) => invitado.id !== id)
  response.status(204).end()
})

module.exports = router
