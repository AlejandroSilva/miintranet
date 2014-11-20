"use strict";

angular.module('user')
    .controller('PerfilController', [
        '$scope',
        'Authentication',
        '$location',
        function($scope, Auth, $location){
            // check if the user is logged in
            //if(!Auth.user){
            //    $location.path('/');
            //    return;
            //}
            // expose the user to the template
            $scope.user = Auth.user;
        }
    ]);