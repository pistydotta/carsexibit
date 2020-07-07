const mongoose = require('mongoose')


module.exports =  mongoose.connect("mongodb+srv://pistydotta:gaspeidinho@carsexibitdb.eupyn.gcp.mongodb.net/carsexibitDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

