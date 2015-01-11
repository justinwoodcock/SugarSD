'use strict';

sugar.controller('HeaderController', ['$scope',
    function($scope) {
        $scope.$watch('navbarCollapsed', function() {
            console.log($scope);
        })

        $scope.navbarCollapsed = true;

        $scope.click = function(){
            console.log($scope);
            $scope.navbarCollapsed = !$scope.navbarCollapsed;
        };
    }
]);