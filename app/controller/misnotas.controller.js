'use strict';

// Routes controller
module.exports.index = function renderIndex(req, res) {
    //If the user is authenticated, show news, profile page and the Intranet Options
    //if(req.isAuthenticated()){
        // TODO: The user have his Intranet Token?
        res.status(200).render('index', {
            user: req.user
        });
    //}
};