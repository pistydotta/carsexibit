const Comment = require('../models/comment_model')
const Car = require('../models/car_model')
const e = require('express')


function newCommentForm(req, res){
    Car.findById(req.params.id, (err, car) => {
        if(err) return console.log(err)
        res.render('comments/new', {car: car})
    })
}

function addComment(req, res){
    Car.findById(req.params.id, (err, car) => {
        if(err) return console.log(err)
        Comment.create(req.body, (err, comment) => {
            if(err) return console.log(err)
            comment.posted_on = req.params.id
            comment.author.id = req.user.id
            comment.author.username = req.user.username
            comment.save()
            req.flash("success", "Successfully added Comment!")
            res.redirect('/cars/' + req.params.id)
        })
    })
}

function editCommentForm(req, res){
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back")
        } else {
            res.render('comments/edit', {car_id: req.params.id, comment: foundComment})
        }
    })
}

function editComment(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, {text: req.body.text}, (err, updatedComment) => {
        if(err){
            res.redirect("back")
        } else {
            res.redirect('/cars/' + req.params.id)
        }
    })
}

function deleteComment(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, (err, deletedComment) => {
        if(err) {
            res.redirect("back")
        } else {
            req.flash("success", "Comment removed")
            res.redirect('/cars/' + req.params.id)
        }
    })
}




module.exports = {newCommentForm, addComment, editCommentForm, editComment, deleteComment}