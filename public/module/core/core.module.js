"use strict";

AppConfig.moduleRegister('core', []);

angular.module('core')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider){
            // si no encuentra una estado, se va a home
            $urlRouterProvider.otherwise('/');

            // cambia la vista dependiendo del estado  // Rutas y estados (https://github.com/angular-ui/ui-router/wiki)
            $stateProvider
                .state('home', {
                    url: '/',
                    views:{
                        title:{
                            templateUrl: 'module/core/views/core.title.html'
                        },
                        body:{
                            templateUrl: 'module/core/views/core.home.guest.html'
                        }
                    }
                })
                .state('test',{
                    url: '/test',
                    views:{
                        title:{
                            template: '<h1>Esta es una pagina de prueba</h1>'
                        },
                        body:{
                            template: '<h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias beatae dicta doloribus earum et eveniet facere fuga fugit laborum magnam magni nostrum, possimus quasi qui reiciendis, repellat rerum tenetur </h2>'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['user'],
                            redirectTo: 'home'
                        }
                    }
                })
        }
    ]);



//angular.module('core').run(
//    function($rootScope, $urlRouter, $state){
//        $rootScope.$on('$stateChangeSuccess', function(evt, newState, oldState){
//            console.log('intentando en '+ newState.name);
//            console.log(newState.data);
//            if(newState.name=='home' && window.user){
//                evt.preventDefault();
//                console.log('redirect to dashboard');
//                $state.go('dashboard', {}, {notify: true});
//            }
//            else
//                $urlRouter.sync();
//        })
//    }
//);