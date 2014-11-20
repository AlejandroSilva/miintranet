'use strict';

// VARIABLES PARA MONGODB
var mongo_host = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var mongo_port = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;
var mongo_user = process.env.OPENSHIFT_MONGODB_DB_USERNAME || 'admin';
var mongo_pass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || '';
var mongo_db   = 'miintranet';

(function checkVariables(){
    console.log("comprobando variables..");
})();

module.exports = {
    node_ip : process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
    node_port :process.env.OPENSHIFT_NODEJS_PORT || 8080,
    db_options: {
        user: mongo_user,
        pass: mongo_pass
    },
    mongo_connection: 'mongodb://'+mongo_host+':'+mongo_port+'/'+mongo_db,
    express: {
        sessionSecret:'tengounpiercingenelpoto',
        sessionDB: 'SessionStore'
    },
    passport: {
        facebookConfig: {
            clientID: '739299026135889', // app id
            clientSecret: '92a2a5a2978da4504dffde8a467091a2', // app secret
            callbackURL: "http://localhost:8080/auth/facebook/callback"
        }
    },
    app: {
        title: 'Intranet SantoTomas',
        keywords: 'intranet santo tomas SantoTomas notas curico',
        description: 'Proyecto para generar acceso mas rapido y a travez de celulares a tus notas en la plataforma de Santo Tomas',
        cssFiles: [
            "lib/bootstrap/dist/css/bootstrap.css",
            "css/style.css"
        ],
        jsFiles: [
            "lib/angular/angular.js",
            "lib/angular-ui-router/release/angular-ui-router.min.js",
            "lib/ui-utils/ui-utils.min.js",
            "lib/angular-permission/dist/angular-permission.js",
            "module/app.js",
            "module/app.auth.js",
            "module/core/core.module.js",
            "module/core/core.controllers.js",
            "module/user/user.module.js",
            "module/user/user.controller.js",
            "module/config/config.module.js",
            "module/config/config.controller.js",
            "module/dashboard/dashboard.module.js"

        ]
    }
};