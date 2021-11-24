const { Schema, model } = require('mongoose')

const eventoSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  nombre: String,
  lugar: String,
  fecha: Date,
  staff: [{ username: String, rol: String }]
})

const Evento = model('Evento', eventoSchema)
module.exports = Evento
