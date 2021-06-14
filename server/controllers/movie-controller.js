const express = require("express");
const moviesLogic = require("../business-logic/movie-logic");

const router = express.Router();

router.get("/movies", async (request, response) => {
    try {
        const movies = await moviesLogic.getAllMovies();
        response.json(movies);
    }
    catch(err){
        response.status(500).send(err.message);
    }
});

router.get("/movie/:movieName", async (request, response) => {
    try {
        const movieName = request.params.movieName;
        const movie = await moviesLogic.getMovie(movieName);
        response.json(movie);
    }
    catch(err){
        response.status(500).send(err.message);
    }
});

module.exports = router;