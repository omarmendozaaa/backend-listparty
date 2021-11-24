const { Schema, model } = require('mongoose')

const eventoRolSchema = new Schema({
  eventoid: { type: Schema.Types.ObjectId, ref: 'Evento' },
  rol: String // Host, Organizer, Security
})

const userSchema = new Schema({
  username: String,
  passwordHash: String,
  eventos: [eventoRolSchema]
})

eventoRolSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)
module.exports = User
