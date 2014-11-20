'use strict';

var passport = require('passport');
var user     = require('../controller/user.controller.js');

module.exports = function(app){
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email']
    }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook',{
            successRedirect: '/',
            failureRedirect: '/failurelogin'
        })
    );
    app.get('/logout', user.logout);
};


// Finish by binding the user middleware
//app.route('/user/:userId');
//app.param('userId', users.userByID);