const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const CommentSchema = new Schema({
    text: String,
    author: {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        username: String
      },
    posted_on: {
      type: Schema.Types.ObjectId,
      ref: 'Car'
    }
})

module.exports = mongoose.model('Comment', CommentSchema)
