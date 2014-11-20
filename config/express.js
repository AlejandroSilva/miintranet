"use strict";
var path         = require('path');
var express      = require('express');
var session      = require('express-session');
var MongoStore   = require('connect-mongo')(express); // ..(session) on express 4
var passport     = require('passport');
var morgan       = require('morgan');
var swig         = require('swig');
var cookieParser = require('cookie-parser');
var config       = require('./config.js');

module.exports = function() {
    var app = express();
    // show morgan logs
    app.use( morgan('dev') );

    // "Application local variables are provided to all templates rendered within the application."
    app.locals= config.app;
    app.locals.facebookAppId = config.passport.facebookConfig.clientID;     // for share a link in social networks
    app.locals.jsFiles = config.app.jsFiles;                                // front end javascript Files
    app.locals.cssFiles = config.app.cssFiles;                              // front end css files
    // catch the url
    app.use(function(req, res, next){
        res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        next();
    });

    // BobyParser, change it in Express 4
    app.use(express.json());       // to support JSON-encoded bodies
    app.use(express.urlencoded()); // to support URL-encoded bodies

    // CookieParser should be above session
    app.use(cookieParser());

    // Express MongoDB session storage
    app.use(session({
        secret: config.express.sessionSecret,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            db: config.express.sessionDB  // name of the db "table"
        })
    }));

    // configure passport
    require('./passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());


    // Set template and view engine
    app.set('view engine', 'html');
    // template extension, and render function
    app.engine('html', swig.renderFile);
    // views folder to render
    app.set('views', './app/views');


    // Setup the routes
    require('../app/route/misnotas.routes.js')(app);
    require('../app/route/phantom.routes.js')(app);
    require('../app/route/userauth.route.js')(app);

    // show the public folder to the client (./public routes)
    app.use(express.static( path.resolve('./public') ));

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function(err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('errors/500', {
            error: err.stack,
            user: req.user
        });
    });


    // Assume 404 since no middleware responded
    app.use(function(req, res) {
        res.status(404).render('errors/404', {
            url: req.originalUrl,
            error: 'Not FoundZZf',
            user: req.user
        });
    });
    return app;
};