'use strict';

sugar.controller('LoginController', ['$scope', 'AuthFactory', '$state', 'SugarFactory', '$timeout',
    function($scope, AuthFactory, $state, SugarFactory, $timeout) {
        $scope.show = 'login';
        $scope.login = function() {
            var creds = {
                email: $scope.email,
                password: $scope.password
            };
            AuthFactory.login(creds);
            $timeout(function() {
                if(AuthFactory.check()) {
                    var storage = SugarFactory.getStorage();
                    storage.session = {
                        hasAuth: true,
                        token: AuthFactory.token()
                    };
                    SugarFactory.setStorage(storage);
                    $state.go('admin-specials');
                }
            }, 750)
        };
        $scope.register = function() {
            var creds = {
                username: $scope.username,
                email: $scope.email,
                password: $scope.password
            };
            AuthFactory.login(creds);
        };
    }
]);