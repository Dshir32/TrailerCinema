global.config = require("./config.json");
const express = require("express");
const cors = require("cors");
const moviesControllers = require("./controllers/movie-controller");
const reviewsControllers = require("./controllers/reviews-controller");
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static(__dirname));
server.use("/review", reviewsControllers);
server.use("/api", moviesControllers);


server.listen(3000, () => console.log("listening on http://localhost:3000/api"));