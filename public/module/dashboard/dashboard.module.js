"use strict";

AppConfig.moduleRegister('dashboard', []);

angular.module('dashboard')
    .config([
        '$stateProvider',
        function($stateProvider){
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    views:{
                        title: {
                            template: '<h1>Dashboard</h1>'
                        },
                        body:{
                            templateUrl: 'module/dashboard/views/dashboard.html'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['fullUser'],
                            redirectTo: 'configuracion'
                        }
                    }
                })
                .state('dashboard.horario', {
                    url: '/horario',
                    templateUrl: 'module/dashboard/views/dashboard.horario.html'
                })
                .state('dashboard.nparciales', {
                    url: '/nparciales',
                    templateUrl: 'module/dashboard/views/dashboard.nparciales.html'
                    //data:{
                    //    roles: 'public'
                    //}
                })
        }
    ]);