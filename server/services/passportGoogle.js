const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const userLogic = require('../business-logic/user-logic');

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});
 
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, function (accessToken , refreshToken, profile, done) {
        const email = profile.emails[0].value;
        const provider = profile.provider;
        const displayName = profile.displayName;
        const providerId = profile.id;
        const providerPicture = profile.photos[0].value;

        userLogic.getGoogleUserByProviderId(providerId).then((dbUser) => {
            if (dbUser) {
                // console.log("user exists");
                done(null, dbUser);
            } else {
                // console.log("user not exists");
                userLogic.registerGoogleUser(providerId, email, displayName, provider, providerPicture, accessToken)
                .then((newUser) => {
                    done(null, newUser);
                })
            }
        });  
   })
);
