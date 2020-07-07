const mongoose = require('mongoose')


module.exports =  mongoose.connect('mongodb://localhost/carsexibitDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

