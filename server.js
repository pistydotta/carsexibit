const express = require('express')
const app = express()
let port = process.env.PORT
const flash = require('connect-flash')
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const passport = require('passport')
const localStrategy = require('passport-local')

const Car = require('./models/car_model')
const User = require('./models/user_model')
const Comment = require('./models/comment_model')

const carRoutes = require("./routes/car_routes")
const indexRoutes = require('./routes/index_routes')
const userRoutes = require('./routes/user_routes')
const Mongoose = require('mongoose')
const url = 'mongodb+srv://pistydotta:gaspeidinho@carsexibitdb.eupyn.gcp.mongodb.net/carsexibitDB?retryWrites=true&w=majority'

Mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to db')
}).catch(err => {
    console.log('ERROR: ', err.message)
})



app.use(flash())

app.use(require('express-session')({
    secret: "Gaspeidinho",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.use(express.static("views"))


app.use(function (req, res, next) {
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})


app.use(carRoutes)
app.use(userRoutes)
app.use(indexRoutes)

app.listen(port, () => {
    console.log('server running on port: ' + port)
})