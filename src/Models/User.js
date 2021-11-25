const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, unique: true },
  nombre: String,
  apellido: String,
  passwordHash: String,
  eventos: [{ evento: { type: Schema.Types.ObjectId, ref: 'Evento' }, rol: String, _id: false }]
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
