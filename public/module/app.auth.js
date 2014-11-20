"use strict";

angular.module(AppConfig.appName)

    // Define the roles of the App
    .run( function(Permission, Authentication){
        // Obtiene Permission porque fue declarado como provider (factory is a provider)
        Permission
            .defineRole('guest', function(stateParam){
                return Authentication.isGuest();
            })
            .defineRole('user', function(stateParam){
                return Authentication.isLoggedIn();
            })
            .defineRole('fullUser', function(stateParam){
                return Authentication.isFullUser();
            })
    })

    // Auth Service
    .factory('Authentication', [
        function(){
            var user = window.user;
            var isGuest = function(){
                return user == '';
            };
            var isLoggedIn = function(){
                return user !== '';
            };
            var isFullUser = function(){
                // a FullUser has a token
                return !!(user && user.intranet && user.intranet.token);
            };
            var isNewUser = function(){
                // is logged in
                if( isLoggedIn() ){
                    // and not a full user
                    return isFullUser()? false: true;
                }else {
                    return false;
                }
            };
            var updateUser = function(newUser){
                user = newUser;

            };
            var User = {
                //getAll: function(){
                //    return user;
                //},
                name: function(){
                    // intranet name is more imporant than the facebook name
                    return user.intranet.nombre || user.facebook.name || 'sin nombre';
                },
                carrera: function(){
                    return user.intranet.carrera
                }
            };

            return {
                //getUser: User.getAll,
                user:{
                    name: User.name,
                    carrera: User.carrera
                },
                isLoggedIn: isLoggedIn,
                isNewUser: isNewUser,
                isFullUser: isFullUser,
                updateUser: updateUser
            };
        }
    ]);
