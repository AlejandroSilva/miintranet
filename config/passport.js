'use strict';
var FacebookStrategy = require('passport-facebook').Strategy;
var User    = require('../app/model/user.model');
var config  = require('./config.js');


module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy( config.passport.facebookConfig,
        function(accessToken, refreshToken, profile, done) {
            // create user
            // save user to the DB

            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User({
                        facebook: {
                            id : profile.id,                    // set the users facebook id
                            token: accessToken,                 // we will save the token that facebook provides to the user
                            email : profile.emails[0].value,    // facebook can return multiple emails so we'll take the first
                            name: profile.name.givenName + ' ' + profile.name.familyName // look at the passport user profile to see how names are returned
                        }
                    });

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }
            });
        }
    ));
};