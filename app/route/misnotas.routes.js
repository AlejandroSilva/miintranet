'use strict';
var misnotas = require('../controller/misnotas.controller');
var user     = require('../controller/user.controller');

module.exports = function(app){
    app.get('/', misnotas.index);
};