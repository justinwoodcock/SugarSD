'use strict';

sugar.controller('LoginController', ['$scope', 'AuthFactory', '$state', 'SugarFactory',
    function($scope, AuthFactory, $state, SugarFactory) {
        $scope.show = 'login';
        $scope.login = function() {
            var creds = {
                email: $scope.email,
                password: $scope.password
            };
            AuthFactory.login(creds);
            setTimeout(function() {
                var hasAuth = AuthFactory.check();
                if(hasAuth) {
                    $state.go('admin-sections');
                    var storage = SugarFactory.getStorage();
                    storage.session = {
                        hasAuth: true,
                        token: AuthFactory.token()
                    };
                    SugarFactory.setStorage(storage);
                }
            }, 250)
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