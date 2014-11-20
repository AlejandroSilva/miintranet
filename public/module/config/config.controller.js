"use strict";

angular.module('config')
    .controller('ConfigController', [
        '$scope',
        'Authentication',
        '$http',
        function($scope, Authentication, $http){
            $scope.Auth = Authentication;
            $scope.formUser = {
                username: 'juanito@stotomas.cst',
                password: '1234'
            };
            $scope.message = '';
            // used as control to show/hide items and set the css class
            $scope.step2completed = Authentication.isFullUser();
            // used to toogle the login form
            $scope.hideLoginForm = $scope.step2completed;
            // used to lock the interaction with the form
            $scope.formLocked = $scope.step2completed;
            //$scope.formLocked = true;


            $scope.toogleLoginForm = function(){
                $scope.hideLoginForm = !$scope.hideLoginForm;
            };

            $scope.processForm = function(){
                // disable the form while the server responds
                $scope.message = 'Logeando, esto puede tardar varios segundos, espere por fabor.';
                $scope.formLocked = true;

                $http.post('intranet/login', $scope.formUser)
                    .success(function(data){
                        $scope.message = data.message;
                        $scope.step2completed = true;
                        //Authentication.user = data.user;
                        Authentication.updateUser(data.user);
                    })
                    .error(function(data, status){
                        $scope.message = data.message;
                        $scope.formLocked = false;
                    });
            }
        }
    ]);