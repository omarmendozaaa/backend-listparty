const { Schema, model } = require('mongoose')

const invitadoSchema = new Schema({
  idevento: String,
  nombre: String,
  apellido: String,
  asistencia: Boolean,
  enlafiesta: Boolean
})
invitadoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})
const Invitado = model('Invitado', invitadoSchema)

module.exports = Invitado
