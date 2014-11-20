"use strict";

angular.module('core')
    .controller('HeaderController', [
        '$scope',
        'Authentication',
        '$rootScope',
        function($scope, Auth, $rootScope){
            $scope.Auth = Auth;
        }
    ])
    .controller('TitleController', [
        '$scope',
        'Authentication',
        '$urlRouter',
        function titleController($scope, Auth, $urlRouter){
            // expose the Service to the template
            $scope.Auth = Auth;
            //$scope.$on('$stateChangeSuccess', function(evt, newState, oldState){
            //    evt.preventDefault();
            //    console.log(newState);
            //    console.log(oldState);
            //    $urlRouter.sync();
            //})
        }
    ])

    .controller('HomePageController', [
        '$scope',
        'Authentication',
        '$location',
        function($scope, Authentication, $location){
            // if is a new user (withouth token), redirect him to the config page
            if(Authentication.isNewUser()){
                $location.path('configuracion');
            }
            // if if is a FullUser, redirect him to the dashboard
            if(Authentication.isFullUser()){
                $location.path('dashboard');
            }
        }
    ]);