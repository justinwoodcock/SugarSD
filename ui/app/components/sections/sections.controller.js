'use strict';

sugar.controller('SectionsController', ['$scope', 'parallaxHelper', 'SugarFactory', '$http', 'Restangular',
    function($scope, parallaxHelper, SugarFactory, $http, Restangular) {

        // $scope.section.nicename = function() {

        // }

        // $http.get('http://sugarsd.dev:1337/section').success(function(data) {
        //     $scope.sections = data;
        // })

        SugarFactory.getEntity('section').then(function(data) {
            $scope.sections = data.plain();
            console.log(data)
        })

        // var map = L.mapbox.map('map', 'justinwoodcock.il70lk8f', {
        //     shareControl: false
        // });
        // // Disable drag and zoom handlers.
        // map.touchZoom.disable();
        // map.scrollWheelZoom.disable();
        // $http.get('http://sugarsd.dev:1337/sections').success(function(data) {
        //     console.log(data);
        // })
    }
]);
