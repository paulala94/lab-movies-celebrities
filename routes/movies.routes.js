// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router()

const Movie = require('./../models/Movie.model')
const Celeb = require('./../models/Celebrity.model')

// add new movie
router.get("/movies/add-new-movie", (req, res, next) => {
    Celeb
    .find()
    .then( celebsFromDB => res.render('movies/new-movie', {celebsFromDB}) )
    .catch(err => console.log(err))

})

router.post("/movies/add-new-movie", (req, res, next) => {
    const { title, plot, genre, cast } = req.body;
    
    Movie
    .create({ title, plot, genre, cast })
    .then(() => res.redirect("/movies-list"))
    .catch(err => console.log(err))
})

// movie list
router.get("/movies-list", (req, res, next) => {
    Movie
    .find()
    .then(movies => res.render("movies/movies", { movies }))
    .catch(err => console.log(err))
})

// movie details
router.get("/movies/details/:movie_id", (req, res, next) => {
    const { movie_id } =  req.params
    
    Movie
    .findById(movie_id)
    .populate('cast')
    .then(movie => res.render('movies/movie-details', movie))
    .catch(err => console.log(err))
})

// delete
router.post("/movies/delete/:movie_id", (req, res, next) => {
    const { movie_id } = req.params
    
    Movie
    .findByIdAndDelete(movie_id)
    .then(movie => res.redirect("/movies-list"))
    .catch(err => console.log(err))
})

// edit

router.get("/movies/edit-movie/:movie_id", (req, res, next) => {
    const { movie_id } = req.params

    Movie
    .findById(movie_id)
    .populate('cast')
    .then(movie => {
        return movie
    })  
    .then( movie => {
        Celeb
            .find()
            .then( celebsFromDB =>
                res.render('movies/edit-movie', {movie, celebsFromDB}) )
            })  
    .catch(err => console.log(err))

})

router.post("/movies/edit-movie/:movie_id", (req, res, next) => {

    const { title, plot, genre, cast } = req.body
    const { movie_id } = req.params

    Movie
    .findByIdAndUpdate(movie_id, { title, plot, genre, cast })
    .then(() => res.redirect(`/movies/details/${movie_id}`))
    .catch(err => console.log(err))
})

module.exports = router;