var page = require('webpage').create();
var system = require('system');
var arg = system.args;

var exitCode = {
    loginSuccess: 1,
    loginFail: 2,
    networkProblems: 3,
    missingCredentials: 4
};
var intranet = {
    landing_url: 'https://miintranet.santotomas.cl',
    login_url: 'https://millave.santotomas.cl/idp/Authn/UserPassword',
    millave_url: 'https://millave.santotomas.cl/idp/profile/SAML2/Redirect/SSO',
    adfs_url: 'https://adfs.santotomas.cl/adfs/ls/',
    home_url: 'https://miintranet.santotomas.cl/Alumno/SitePages/Home.aspx',
    loginAttemp: 0,
    hasLoginError: false,
    debugMode: true,
    username: arg[1],
    password: arg[2]
};

function debugmessage(str){
    if( intranet.debugMode ){
        system.stderr.write(str+'\n');
    }
}
function logmessage(str){
    console.log(str);
}

page.onConsoleMessage = function(msg, lineNum, sourceId) {
    debugmessage('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

page.onUrlChanged = function(targetUrl) {
    intranet.currentURL = targetUrl;
    //debugmessage('New URL opened: ' + targetUrl);
};

page.onLoadFinished = function(status) {
    if( status!=='success' ){
        debugmessage('Page loaded with status: ' + status + ' ('+intranet.currentURL+')... ¿network or ssl problemas?');
        phantom.exit(exitCode.networkProblems);
    }else{
        debugmessage('Page loaded with status: ' + status + ' ('+intranet.currentURL+')');
    }

    // We're on the login form
    if(intranet.currentURL===intranet.login_url){
        intranet.loginAttemp += 1;
        intranet.hasLoginError = page.evaluate(function(username_param, password_param){
            var pmensaje = document.getElementsByTagName('p')[0];
            if(pmensaje && pmensaje.innerText === 'Credenciales Incorrectas.'){
                return true;
            }else{
                document.getElementById("username").value = username_param;
                document.getElementById("password").value = password_param;
                document.getElementsByTagName("form")[0].submit();
                return false;
            }
        }, intranet.username, intranet.password);

        // check if the screen has a login error
        if(intranet.hasLoginError || intranet.loginAttemp>1){
            debugmessage('>> Invalid credentials... please try again.');
            phantom.exit(exitCode.loginFail);
        }else{
            debugmessage('trying to login...');
        }

    }else if( intranet.currentURL===intranet.home_url ){
        // We're on the Intranet home page
        debugmessage('Searching user data...');
        var userData = page.evaluate(function(){
            var DOM = {
                nombre     : document.getElementById('data-Name'),
                rut        : document.getElementById('data-Identidad'),
                institucion: document.getElementsByClassName('col-itemvalor')[0],
                sede       : document.getElementsByClassName('col-itemvalor')[1],
                carrera    : document.getElementsByClassName('col-itemvalor')[2],
                email      : document.getElementById('data-Email'),
                token      : document.getElementById('data-stomas')
            };
            var data = {
                nombre     : DOM.nombre? DOM.nombre.value:'',
                rut        : DOM.rut? DOM.rut.value:'',
                institucion: DOM.institucion? DOM.institucion.textContent:'',
                sede       : DOM.sede? DOM.sede.textContent:'',
                carrera    : DOM.carrera? DOM.carrera.textContent:'',
                email      : DOM.email? DOM.email.value:'',
                token      : DOM.token? DOM.token.value:''
            };
            return JSON.stringify(data);
        });
        debugmessage(userData);
        debugmessage('work done! :D');

        logmessage(userData);
//        page.render('intranet.png');
        phantom.exit(exitCode.loginSuccess);
    }else{
        //console.log('ignoring page...');
        // we mush chech for a big amount of this cases?
    }
};



(function start(){
    // check for username and password
    if(!intranet.username || !intranet.password ){
        debugmessage('Missing username or password');
        phantom.exit(exitCode.missingCredentials);
    }else{
        debugmessage('\nOpening login page');
        intranet.currentURL = intranet.landing_url;
        page.open(intranet.landing_url);
        //phantom.exit(exitCode.loginSuccess);
    }
})();

/*
Flujo normal
 Opening login page
 Page load finished with status: success (https://millave.santotomas.cl/idp/Authn/UserPassword)
 trying to login...
 Page load finished with status: success (https://millave.santotomas.cl/idp/profile/SAML2/Redirect/SSO)
 Page load finished with status: success (https://adfs.santotomas.cl/adfs/ls/)
 Page load finished with status: success (https://miintranet.santotomas.cl/Alumno/SitePages/Home.aspx)
 >> LLEGAMOS AL HOME DE LA INTRANET <<
 >> capturando imagen

PASSWORD INCORRECTO
 Opening login page
 Page load finished with status: success (https://millave.santotomas.cl/idp/Authn/UserPassword)
 trying to login...
 Page load finished with status: success (https://millave.santotomas.cl/idp/Authn/UserPassword)
 >> Invalid credentials... please try again.

SIN CERTIFICADO
 Opening login page
 Page loaded with status: fail (https://miintranet.santotomas.cl)
 >> Error opening https://miintranet.santotomas.cl... network or ssl problemas.

 */