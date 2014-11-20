"use strict";

AppConfig.moduleRegister('config', []);

angular.module('config')
    .config([
        '$stateProvider',
        function($stateProvider){
            $stateProvider
                .state('configuracion', {
                    url: '/configuracion',
                    views:{
                        title:{
                            template: "<h1>Configuracion</h1>"
                        },
                        body: {
                            templateUrl: 'module/config/views/config.body.html'
                        }
                    },
                    data:{
                        permissions:{
                            only: ['user'],
                            redirectTo: 'home'
                        }
                    }
                })
        }
    ]);