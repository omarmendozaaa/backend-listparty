const express = require('express')
const router = express.Router()
const Evento = require('./../Models/Invitado')

let eventos = [
  {
    id: 1,
    anfitrion: 'omarmendoza',
    nombre: 'Cumpleaños Jhamileth',
    lugar: 'Casa de Chavez',
    fecha: '2011-10-05T14:48:00.000Z',
    organizadores: ['maryanemendozaa', 'jhamilethsalazar'],
    seguridad: ['mariobarrena']
  },
  {
    id: 2,
    anfitrion: 'maryanemendozaa',
    nombre: 'Organika Festival',
    lugar: 'Jr tuputamadre',
    fecha: '2011-10-05T14:48:00.000Z',
    organizadores: ['omarmendoza', 'jhamilethsalazar', 'mariobarrena'],
    seguridad: ['alexanderarboleda']
  },
  {
    id: 3,
    anfitrion: 'omarmendoza',
    nombre: 'Cumpleaños Claudaia',
    lugar: 'Jr. 3 Esquinas 516',
    fecha: '2011-10-05T14:48:00.000Z',
    organizadores: ['maryanemendozaa', 'jhoelchavez'],
    seguridad: ['mariobarrena']
  }
]

const generateId = () => {
  const maxId = eventos.length > 0 ? Math.max(...eventos.map((n) => n.id)) : 0
  return maxId + 1
}

router.get('/', (request, response) => {
  response.json(eventos)
})

router.get('/:id', (request, response) => {
  const id = Number(request.params.id)
  const evento = eventos.find((evento) => evento.id === id)
  evento ? response.json(evento) : response.status(404).end()
})

router.post('/', (request, response) => {
  const body = request.body

  const evento = {
    id: generateId(),
    host: body.host,
    nombre: body.nombre,
    lugar: body.lugar,
    fecha: body.fecha
  }

  eventos = eventos.concat(evento)
  response.json(evento)
})

router.put('/:id', (request, response) => {
  const body = request.body
  const id = Number(request.params.id)
  const evento = eventos.find((evento) => evento.id === id)

  evento.nombre = body.nombre
  evento.lugar = body.lugar
  evento.fecha = body.fecha

  evento ? response.json(evento) : response.status(404).end()
})

router.delete('/:id', (request, response) => {
  const id = Number(request.params.id)
  eventos = eventos.filter((evento) => evento.id !== id)
  response.status(204).end()
})

module.exports = router
