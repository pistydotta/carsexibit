function homePage(req, res){
    res.redirect('/cars')
}

function notFound(req, res){
    res.send("The page you're looking for wasn't found")
}

module.exports = {homePage, notFound}