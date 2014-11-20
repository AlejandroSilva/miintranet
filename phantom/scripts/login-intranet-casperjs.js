// error con el cetificado ssl
// casperjs --ignore-ssl-errors=yes login.js
var fs = require('fs');
var casper = require("casper").create({
  verbose: true,
//  logLevel: "debug",
  pageSettings: {
        loadImages: false
  }
});

if( !casper.cli.has(0) || !casper.cli.has(1) ){
    //casper.echo("error: se necesitan mas parametros. Ej. 'casperjs.exe script.js juanperez@alumnos.cst pass123'");
    casper.echo("se necesitan mas parametros para llamar al script");
    casper.exit(-1);
}
var paramUsuario  = casper.cli.get(0);
var paramPassword = casper.cli.get(1);

var url_intranet         = 'https://miintranet.santotomas.cl';
var url_createUpdateUser = 'http://localhost/scrapper/creteUpdateUser.php';
var globalData;   // donde se almacenara la respuesta del script

casper.start();

casper.setHttpAuth(paramUsuario, paramPassword);
//casper.setHttpAuth('Cristinasoledad.maldonado@alumnos.cst', 'soledad123');
//casper.setHttpAuth('alejandroalfonso.silva@alumnos.cst', '9300k');
casper.thenOpen(url_intranet, function(){
    // validar que haya entrado bien

    globalData = this.evaluate(function(){
      var data = new Object;
      data.nombre  = $('#data-Name').val();
      data.rut     = $('#data-Identidad').val();
      data.carrera = $('.col-itemvalor')[2].textContent;
      data.email   = $('#data-Email').val();
      data.token   = $('#data-stomas').val();
      return data;
    });
    if(globalData!=undefined){
        // SE LOGRO OBTENER LOS DATOS CORRECTAMENTE...
        //this.echo("la variable data = "+data);
        //this.open( urlNotasFinales+'?ustomas='+data);
    }else{
        this.echo("no se pudo encontrar los datos necesarios, (login incorrecto)?");
        this.exit(-2);
    }
});
/*
casper.open(url_createUpdateUser, {
    method: 'post',
    data:{
        'puntos': paramPuntos,
        'fecha': paramFecha
    }
});
*/
casper.then(function(){
    var res = JSON.stringify(globalData);
    this.echo( res );
})
casper.run();


/* resultados:
   0  pendiente: retorno un json con los datos
  -1  parametros invalidos
  -2  login invalido
*/