const express = require("express");
const router = express.Router();
const passport = require('passport');
const userLogic = require("../business-logic/user-logic");

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    })
);

let urlPath = (process.env.NODE_ENV === 'production' ? 'https://trailer-cinema.herokuapp.com' :'http://localhost:3001')

// router.get('/auth/google/callback', passport.authenticate('google'));

router.get('/auth/google/callback' , passport.authenticate('google'),
        (req, res) => {
            // res.redirect('http://localhost:3001/');
            res.redirect(urlPath);           
        }
    );

router.get('/auth/logout', (req, res) => {
    req.logout(); 
    // logout is attached automatically to the req obj by passport, 
    // when we call logout it takes the cookie that contains the user.id and kill it.
    // res.redirect('http://localhost:3001/');
    res.redirect(urlPath);
});

router.get('/auth/current_user', async (req, res) => {
    const userCall = req.user;
    if(userCall){
        try {
            const user = await userLogic.getGoogleUserByUserId(userCall);
            res.status(200).json(user);
        }
        catch(err){
            res.status(500).send(err.message);
        }
    } else {
        res.status(401).send('err');
    }
});

module.exports = router;