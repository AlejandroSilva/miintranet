'use strict';
//var intranet = require('../../phantom-caller.js');

module.exports = function(app){

    var loginController = function(req, res){
        var formUser = req.body;
        // TODO: validata username and password
        if(formUser.username && formUser.password){
            var newUser = req.user;
            newUser.intranet.token = "tokenchallaseteadoamano";
            newUser.intranet.nombre = "intranet Name";
            newUser.intranet.carrera = "unacarreraX";
            console.log(newUser);
            res.status(200).json({
                status: 'ok',
                message: 'Login correcto, has desbloqueado todas las opciones!',
                user: newUser
            })
        }else{
            res.status(401).json({
                status: 'fail',
                message: 'credenciales invalidas, intenta nuevamente.'
            })
        }
    };

    app.post('/intranet/login', function(req, res){
        setTimeout(function(){
            loginController(req, res);
        }, 1000);
    });

    //app.get('/phantom/login', function(req, res){
    //    phantom.getUserData('cristinasoledad.maldonado@alumnos.cst', 'soledad123', function(err, userData){
    //        if(err) {
    //            res.send(err.message);
    //        }else{
    //            var urlParciales = 'https://misservicios.santotomas.cl/reportes/Intrav3/bNotasParciales.aspx?ustomas='+userData.token+'&IsDlg=1';
    //            var userdataStr = JSON.stringify(userData);
    //            res.send('<!doctype html><html><body><a target="_blank" href="'+urlParciales+'">Link a a las notas parciales</a>'+userdataStr+'</body></html>')
    //        }
    //    });
    //});

    //app.get('/wrapper/notasParciales', function(req, res){
    //    var token = 'R2U7+QnSBmEAfHhW5HhhJcwIUh2y3PwtkUITEsw+SirrGcP/FMRNRPQo6poV+Bqo';
    //    var notasParciales = 'https://misservicios.santotomas.cl/reportes/Intrav3/bNotasParciales.aspx?ustomas='+token+'&IsDlg=1';
    //    res.send('<!doctype html><html><body><a target="_blank" href="'+notasParciales+'">Link a a las notas parciales</a></body></html>')
    //});

};