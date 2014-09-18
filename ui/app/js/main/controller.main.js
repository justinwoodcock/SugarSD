'use strict';

uiBase.controller('MainController', ['$scope', 'parallaxHelper',
    function($scope, parallaxHelper) {
        var map = L.mapbox.map('map', 'justinwoodcock.il70lk8f', {
            shareControl: false
        });
        // Disable drag and zoom handlers.
        map.touchZoom.disable();
        map.scrollWheelZoom.disable();
    }
]);
