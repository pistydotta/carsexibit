const Car = require("../models/car_model")
const User = require('../models/user_model')
const express = require("express")
const Comment = require('../models/comment_model')


function showEditForm(req, res){
    Car.findById(req.params.id, (err, foundCar) => {
        if(err) return console.log(err)
        res.render('cars/edit', {car: foundCar})
    })
}

function showCars(req, res){
    Car.find({}, (err, cars) => {
        if(err) return console.log(err)
        res.render("cars/showPage", {cars: cars})
    })
}

function destroyCar(req, res){
    Car.findByIdAndDelete(req.params.id, (err, removedCar) => {
        if(err) return console.log(err)
        res.redirect("/cars")
    })
}

function editCar(req, res){
    Car.findByIdAndUpdate(req.params.id, req.body.car, (err, edittedCar) => {
        if(err) return console.log("deubom n")
        console.log(edittedCar)
        res.redirect("/cars/" + edittedCar._id)
    })
}

function addCar(req, res){
    res.render('cars/new')
}

function createCar(req, res){
    var newCar = new Car(req.body.car)
    newCar.author.id = req.user._id
    newCar.author.username = req.user.username
    newCar.save((err, car) => {
        if(err) return console.log(err)
        res.redirect('/cars/' + car._id)
    })
}

function showOne(req, res){
    Car.findById(req.params.id, (err, car) => {
        if(err) {
            res.redirect('/cars')
        } else {
            Comment.find({posted_on: req.params.id}, (err, comments) => {
                if(err) {
                    console.log(err)
                } else {
                res.render('cars/showOne', {car: car, comments: comments})
                }
            })
        }
    })
}




module.exports = {showCars, addCar, createCar, showOne, showEditForm, editCar, destroyCar}