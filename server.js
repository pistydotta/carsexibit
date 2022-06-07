const express = require('express')
require('./config/db_connect')
const app = express()

const flash = require('connect-flash')
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const passport = require('passport')
const localStrategy = require('passport-local')

const User = require('./models/user_model')

const carRoutes = require("./routes/car_routes")
const indexRoutes = require('./routes/index_routes')
const userRoutes = require('./routes/user_routes')
let port = process.env.PORT || 3005




app.locals.moment = require('moment')

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
app.use(express.static(__dirname + '/public'))

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