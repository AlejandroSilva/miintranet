var exitCode = {
    loginSuccess: 1,
    loginFail: 2,
    networkProblems: 3,
    missingCredentials: 4
};

var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');

var binPath = phantomjs.path;
var options = {
    timeout: 30*1000    // 30 secs
};

function getUserData(username, password, callback) {
    var childArgs = [
//    '--debug=true',
        '--ignore-ssl-errors=yes',
        path.join(__dirname, 'scripts/intranet-login.js'),
        username,
        password
    ];
    childProcess.execFile(binPath, childArgs, options, function (err, stdout, stderr) {
        if (err.killed) {
            callback( new Error("El proceso demoro demasiado tiempo, intentelo nuevamente mas tarde.") );
        }
        if (err.code === exitCode.loginSuccess) {
            try {
                var userData = JSON.parse(stdout);
                callback(null, userData);
            } catch (ex) {
                callback( new Error("Login correcto, pero no se obtuvo una respuesta, por favor contacte al webmaster.") );
            }
        } else if (err.code === exitCode.loginFail) {
            callback( new Error("Las credenciales son invalidas, reviselas e intente nuevamente.") );
        } else if (err.code === exitCode.networkProblems) {
            callback( new Error("Ocurrio un problema de red o de certificados SSL, por favor contarte al webmaster.") );
        } else if (err.code === exitCode.missingCredentials) {
            callback( new Error("Debe ingresar un usuario y una contraseña.") );
        } else {
            console.log("--------------------------------- error:  \n", err);
            console.log("--------------------------------- stderr: \n", stderr);
            console.log("--------------------------------- stdout: \n", stdout);
            console.log("---------------------------------");
            callback( new Error("Ocurrio algo inesperado, revise el log de actividades. Por favor contacte al webmaster.") );
        }
    });
}

exports.getUserData = getUserData;
exports.binPath = binPath;