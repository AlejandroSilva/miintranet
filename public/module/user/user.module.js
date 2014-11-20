"use strict";
AppConfig.moduleRegister('user', []);

angular.module('user')
    .config([
        '$stateProvider',
        function($stateProvider){
            $stateProvider
                .state('perfil', {
                    url: '/perfil',
                    views:{
                        title: {
                            templateUrl: 'module/core/views/core.title.html'
                        },
                        body: {
                            templateUrl: 'module/user/views/user.perfil.html'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['user'],
                            redirectTo: 'home'
                        }
                    }
                });
        }
    ]);
