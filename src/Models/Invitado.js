const { Schema, model } = require('mongoose')

const invitadoSchema = new Schema({
  idevento: Schema.Types.ObjectId,
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
