'use strict';

uiBase.controller('MainController', ['$scope', 'parallaxHelper',
    function($scope, parallaxHelper) {
        // you're welcome for the controller.
        $scope.test = 'stubbing out test';

        $scope.background = parallaxHelper.createAnimator(-0.3);

    }
]);