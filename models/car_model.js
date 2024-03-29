const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const CarSchema = new Schema({
    name: String,
    image: String,
    description: String,
    createdAt: {type: Date, default: Date.now},
    author: {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      username: String
    }
})

module.exports = mongoose.model('Car', CarSchema)
