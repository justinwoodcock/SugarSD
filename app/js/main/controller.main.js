'use strict';

uiBase.controller('MainController', ['$scope', 'parallaxHelper',
    function($scope, parallaxHelper) {
        L.mapbox.map('map', 'justinwoodcock.il70lk8f', {
            shareControl: false
        })
    }
]);