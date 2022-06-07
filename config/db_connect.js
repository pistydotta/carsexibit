const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/carsexibitDB'

const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao banco de dados com sucesso')
}).catch((error) => {
    console.log('Erro ao se conectar com o banco de dados')
    console.log(error)
})

module.exports = connect