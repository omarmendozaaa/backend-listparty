const { Schema, model } = require('mongoose')

const eventoSchema = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  nombre: String,
  lugar: String,
  fecha: Date,
  staff: [{ username: String, rol: String }]
})

eventoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Evento = model('Evento', eventoSchema)
module.exports = Evento
