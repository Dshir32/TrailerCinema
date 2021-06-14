const dal = require("../data-access-layer/dal");

async function getAllMovies(){
    const sql = `SELECT movies.*, COUNT(reviews.movieId) as reviewsCount
    FROM movies
    left join reviews on movies.movieId = reviews.movieId
    GROUP BY reviews.movieId`;




    
    const movies = await dal.executeAsync(sql);
    return movies;
}

async function getMovie(movieName){
    const sql = `SELECT *  FROM movies WHERE name LIKE '${movieName}'`;
    const movie = await dal.executeAsync(sql);
    return movie;
}
module.exports = {
    getAllMovies,
    getMovie
};