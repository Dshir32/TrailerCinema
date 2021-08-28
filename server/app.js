global.config = require(process.env.NODE_ENV === "production" ? "./config/config-prod.json" : "./config/config-dev.json");
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const moviesControllers = require("./controllers/movie-controller");
const reviewsControllers = require("./controllers/reviews-controller");
const googleOauthController = require('./controllers/googleOauth-controller');
const passport = require ('passport')
require("./services/passportGoogle");

const path = require("path");
const server = express();

server.use(cors());
server.use(express.json());
server.use(
    cookieSession({
        name: "userCookie",
        maxAge: 36000*24*30*1000,
        keys: [keys.cookieKey]
    })
);
server.use(passport.initialize());
server.use(passport.session());

server.use(express.static(path.join(__dirname, "./_front-end")));

// server.use(express.static(__dirname));
server.use(cors({
    origin: ["http://localhost:3001","https://trailer-cinema.herokuapp.com"] , //Address of the client 
    credentials: true //allows session cookie
}));

server.use("/", googleOauthController);
server.use("/review", reviewsControllers);
server.use("/api", moviesControllers);

server.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./_front-end/index.html"));
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));