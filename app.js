'use strict';

var express  = require('./config/express.js');
var mongoose = require('mongoose');
var config   = require('./config/config.js');

// Database connection
mongoose.connect(config.mongo_connection, config.db_options, function(err, db) {
    console.log('conectando a : '+config.mongo_connection +'como: '+config.db_options.user+":"+config.db_options.pass);
    if(err){
        console.warn("Mongodb error: "+err);
    } else {
        console.log("mongodb conectado correctamente");

        // Express
        var app = express();
        app.listen(config.node_port, config.node_ip, function(){
            console.log("Iniciando el servidor en : "+config.node_ip+":"+config.node_port);
        });
    }
});

//jXRimRW/iMhjhyQQIJQSc2hYeFInOY2gdnjg5FXvlaAGogIM/yxh9u9lFPWF+DxU
//https://misservicios.santotomas.cl/reportes/Intrav3/bNotasParciales.aspx?ustomas=jXRimRW/iMhjhyQQIJQSc2hYeFInOY2gdnjg5FXvlaAGogIM/yxh9u9lFPWF+DxU&IsDlg=1