const { Schema, model } = require('mongoose')

const invitadoSchema = new Schema({
  eventoid: { type: Schema.Types.ObjectId, ref: 'Evento' },
  nombre: String,
  apellido: String,
  asistencia: Boolean,
  enlafiesta: Boolean
})
invitadoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Invitado = model('Invitado', invitadoSchema)

module.exports = Invitado
