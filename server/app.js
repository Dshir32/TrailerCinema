global.config = require("./config/config.json");
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const moviesControllers = require("./controllers/movie-controller");
const reviewsControllers = require("./controllers/reviews-controller");
const googleOauthController = require('./controllers/googleOauth-controller');
const userController = require('./controllers/user-controller');
const passport = require ('passport')
require('./services/passportGoogle');
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

server.use(express.static(__dirname));

server.use(cors({
    origin:"http://localhost:3001", //Address of the client 
    credentials: true //allows session cookie
}));

server.use("/review", reviewsControllers);
server.use("/api", moviesControllers);
server.use("/", googleOauthController);


server.listen(3000, () => console.log("listening on http://localhost:3000"));