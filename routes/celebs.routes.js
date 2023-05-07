// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router()


const Celeb = require('./../models/Celebrity.model')

// celeb list
router.get ("/celebs-list", (req, res, next) => {
    Celeb 
    .find()
    .then(celebs => res.render(`celebs/celebs`, { celebs }))
    .catch(err => console.log(err))
})

// add new celeb
router.get("/celebs/add-new-celeb", (req, res, next) => {
    res.render('celebs/new-celeb')
})

router.post("/celebs/add-new-celeb", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

Celeb 
.create({ name, occupation, catchPhrase })
.then(newCeleb => res.redirect(`/celebs-list`))
.catch(err => console.log(err))

})

// delete
router.post("/celebs/delete/:celeb_id", (req, res, next) => {
    const { celeb_id } = req.params
    
    Celeb
    .findByIdAndDelete(celeb_id)
    .then(celeb => res.redirect("/celebs-list"))
    .catch(err => console.log(err))
})

module.exports = router;