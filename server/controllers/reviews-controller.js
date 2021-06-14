const express = require("express");
const reviewsLogic = require("../business-logic/reviews-logic");

const router = express.Router();

router.get("/:movieId", async (request, response) => {
    try {
        const movieId = request.params.movieId;
        const movieReviews = await reviewsLogic.getMovieReviews(movieId);
        response.json(movieReviews);
    }
    catch(err){
        response.status(500).send(err.message);
    }
});

router.post("/add-review" , async (req, res) => {
    try {
        const review = req.body;
        console.log(review);
        const addedReview = await reviewsLogic.addReview(review);
        res.status(200).json(addedReview);
    } catch(err){
        res.status(500).send(err.message)
    }
});

module.exports = router;