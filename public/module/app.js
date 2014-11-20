var AppConfig = (function(){
    var appName = 'miIntranet';
    var dependencies = [
        'ui.router',
        'ui.utils',      // ui-route y $uiRoute in the navbar
        'permission'
    ];
    var moduleRegister = function moduleRegister(moduleName, dependencies){
        // the new module is a dependency of our app
        angular.module(appName).requires.push(moduleName);
        // define the module
        angular.module(moduleName, dependencies || []); // [] to define a new module
    };
    return{
        appName: appName,
        dependencies: dependencies,
        moduleRegister: moduleRegister
    }
})();

// register app dependencies
angular.module(AppConfig.appName, AppConfig.dependencies);

// On page load...
angular.element(document).ready(function(){
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_')
        window.location.hash = '#!';
    // iniciar manualmente la app (reemplaza a ng-app)
    angular.bootstrap(document, [AppConfig.appName]);
});


//angular.element(document).injector().get('Authentication')