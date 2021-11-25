const express = require('express')
const User = require('../Models/User')
const router = express.Router()
const Evento = require('./../Models/Evento')

router.get('/', async (request, response) => {
  await Evento.find({}).then(eventos => {
    response.json(eventos)
  })
})

router.get('/:id', async (request, response, next) => {
  const { id } = request.params
  await Evento.findById(id).then(evento => {
    evento ? response.json(evento) : response.status(404).end()
  }).catch(err => next(err))
})

router.post('/', async (request, response) => {
  // sacar userid de request
  const body = request.body

  const user = await User.findById(request.userId)

  const NewEvento = new Evento({
    userid: request.userId,
    nombre: body.nombre,
    lugar: body.lugar,
    fecha: body.fecha
  })

  await NewEvento.save().then(SavedEvento => {
    user.eventos = user.eventos.concat({ eventoid: SavedEvento._id, rol: 'Host' })
    user.save()
    response.json(SavedEvento)
  })
})

router.put('/:id', async (request, response, next) => {
  const body = request.body
  const { id } = request.params

  const UpdateEvento = {
    nombre: body.nombre,
    lugar: body.lugar,
    fecha: body.fecha
  }

  await Evento.findByIdAndUpdate(id, UpdateEvento, { new: true }).then(updatedEvento => {
    updatedEvento ? response.json(updatedEvento) : response.status(404).end()
  }).catch(err => next(err))
})

router.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  Evento.findByIdAndDelete(id).then(async (DeletedEvento) => {
    const user = await User.findById(DeletedEvento.userid)
    user.eventos = user.eventos.filter((evento) => {
      return evento.eventoid.toString() !== DeletedEvento.id
    })
    await user.save()
    response.status(204).end()
  }).catch(err => next(err))
})

module.exports = router
