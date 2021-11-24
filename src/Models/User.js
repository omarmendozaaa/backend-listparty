const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: String,
  passwordHash: String,
  eventos: [{ type: Schema.Types.ObjectId, ref: 'Evento', Rol: String }] // Host, Organizer, Security
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
