'use strict';

sugar.controller('LoginController', ['$scope', 'AuthFactory', '$state',
    function($scope, AuthFactory, $state) {
        $scope.show = 'login';
        $scope.login = function() {
            var creds = {
                email: $scope.email,
                password: $scope.password
            };
            AuthFactory.login(creds);
            setTimeout(function() {
                var hasAuth = AuthFactory.check();
                console.log(hasAuth);
                if(AuthFactory.check) {
                    $state.go('admin-sections');
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