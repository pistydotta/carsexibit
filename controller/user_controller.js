const User = require('../models/user_model')
const Car = require('../models/car_model')
const Comment = require('../models/comment_model')
const mongoose = require('mongoose')
const passport = require('passport')

function showRegisterForm(req, res) {
    if (!req.user) {
        res.render("user/register")
    } else {
        res.render('cars/showPage')
    }
}

function showLoginForm(req, res) {
    res.render('user/login')
}



function login(req, res, next) {
    const handler = passport.authenticate('local', {
        successRedirect: '/cars',
        failureRedirect: '/login'
    });
    handler(req, res, next);
}

function logout(req, res) {
    if (req.user != undefined) req.logout()
    req.flash("success", "Logged you out!")
    res.redirect('/cars')
}

function register(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            req.flash("error", err.message)
            res.redirect("back")
        } else {
            passport.authenticate("local")(req, res, () => {
                req.flash("success", "Welcome to CarsExibit " + err.username)
                res.redirect('/cars')
            
        })
    }
})
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash("error", "You need to be logged in to do that")
    return res.redirect('/login')
}

function isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/cars')
}

function isOwner(req, res, next) {
    if (req.isAuthenticated()) {
        Car.findById(req.params.id, (err, foundCar) => {
            if (err) {
                req.flash("error", "Campground not found")
                res.redirect("back")
            } else if (foundCar.author.id.equals(req.user._id)) {
                next()
            } else {
                req.flash("error", "You don't have permission to do that")
                res.redirect("back")
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back")
    }
}


function isCommentOwner(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect("back")
            } else if (foundComment.author.id.equals(req.user._id)) {
                next()
            } else {
                req.flash("error", "You don't have permission to do that")
                res.redirect("back")
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back")
    }
}


module.exports = { showRegisterForm, register, showLoginForm, login, logout, isLoggedIn, isNotLoggedIn, isOwner, isCommentOwner }