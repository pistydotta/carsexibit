function homePage(req, res){
    res.render('index/homePage')
}

function notFound(req, res){
    res.send("The page you're looking for wasn't found")
}

module.exports = {homePage, notFound}