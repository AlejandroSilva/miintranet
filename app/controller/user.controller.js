'use strict';

// Routes controller
exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

// Middleware
exports.isLoggedIn = function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

      // if they aren't redirect them to the home page
    res.redirect('/');
};

exports.hasToken = function hasToken(req, res, next) {
    // if user is authenticated in the session...
    if (req.isAuthenticated()){
        // and has the intranet token, then continue
        if(req.user.intranet && req.user.intranet.token){
            return next();
        }
        // otherwise
        else{
            res.redirect('/configuracion');
        }
    }else {
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
};


exports.userByID = function(req, res, next, id) {
    User.findOne({
        _id: id
    }).exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        req.profile = user;
        next();
    });
};