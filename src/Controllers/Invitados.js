const express = require('express')
const router = express.Router()
const Invitado = require('./../Models/Invitado')

router.get('/', (request, response) => {
  Invitado.find({}).then(invitados => {
    response.json(invitados)
  })
})

router.get('/:id', (request, response, next) => {
  const { id } = request.params
  Invitado.findById(id).then(invitado => {
    invitado ? response.json(invitado) : response.status(404).end()
  }).catch(err => {
    next(err)
  })
})

router.post('/', (request, response) => {
  const body = request.body

  const NewInvitado = new Invitado({
    // idevento: body.idevento,
    nombre: body.nombre,
    apellido: body.apellido,
    asistencia: false,
    enlafiesta: false
  })

  NewInvitado.save().then(savedInvitado => {
    response.json(savedInvitado)
  })
})

router.put('/:id', (request, response, next) => {
  const invitado = request.body
  const { id } = request.params

  const NewInvitadoInfo = {
    nombre: invitado.nombre,
    apellido: invitado.apellido,
    asistencia: invitado.asistencia,
    enlafiesta: invitado.enlafiesta
  }

  Invitado.findByIdAndUpdate(id, NewInvitadoInfo, { new: true }).then(updateInvitado => {
    updateInvitado ? response.json(updateInvitado) : response.status(404).end()
  }).catch(err => next(err))
})

router.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Invitado.findByIdAndDelete(id).then(result => {
    response.status(204).end()
  }).catch(err => next(err))
})

module.exports = router
