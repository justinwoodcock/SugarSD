'use strict';

sugar.controller('LoginController', ['$scope', 'AuthFactory', '$http', 'Restangular',
    function($scope, AuthFactory, $http, Restangular) {
        $scope.show = 'login';
        $scope.login = function() {
            var creds = {
                email: $scope.email,
                password: $scope.password
            };
            AuthFactory.login(creds);

                // Restangular.one('auth', 'login').get(creds).then(function(data) {
                //     console.log(data);
                // }, function(data) {
                //     console.log(data);
                // });

                // Auth.get(JSON.stringify(creds)).then(function(data) {
                //     console.log(data);
                // }, function(data) {
                //     console.log(data);
                // })

            // $http.get('http://sugarsd.dev:1337/auth/login?email='+$scope.email+'&password='+$scope.password).
            // success(function(data, status, headers, config) {
            //     console.log(data);
            // }).
            // error(function(data, status, headers, config) {
            //     console.log(data);
            // });
        };
        $scope.register = function() {};
    }
]);