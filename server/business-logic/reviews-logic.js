const dal = require("../data-access-layer/dal");

async function getMovieReviews(movieID){
    const sql = `SELECT movies.name, reviews.reviewId, reviews.movieId, reviews.content, reviews.dateAdded, users.userId, users.firstName, users.lastName, users.profilePicUrl
    FROM reviews 



    
    LEFT JOIN movies ON movies.movieId = reviews.movieId
    LEFT JOIN users on users.userId = reviews.userId
    where reviews.movieId = ${movieID}`;
    const reviews = await dal.executeAsync(sql);
    return reviews;
}

async function addReview(review){
    var now = new Date().toLocaleString().split(",")[0];
    const sql = `insert into reviews(reviewId, movieId, userId, content, dateAdded) values(
        Null, ${review.movieId}, ${review.userId}, '${review.content}', '${now}')`;
    const info = await dal.executeAsync(sql);
    review.reviewId = info.insertId;
    return review;
}

module.exports = {
    getMovieReviews,
    addReview
}