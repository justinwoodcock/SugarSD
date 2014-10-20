'use strict';

sugar.controller('SectionsController', ['$scope', 'parallaxHelper', 'SugarFactory',
    function($scope, parallaxHelper, SugarFactory) {

        SugarFactory.getEntity('section').then(function(data) {
            $scope.sections = [];
            _.forEach(data.plain(), function(section) {
                if(section.title !== 'services') {
                    $scope.sections.push(section);
                };
            })
        })

        SugarFactory.getEntity('service').then(function(data) {
            //$scope.services = data.plain();
            sortServices(data.plain());
            //console.log(data.plain())
        })

        SugarFactory.getEntity('contact').then(function(data) {
            $scope.contact = data.plain()[0];
            console.log($scope.contact);
        })

        function sortServices(services) {
            $scope.services = {};
            _.forEach(services, function(service) {
                var categoryId = service.category.toLowerCase().replace(/ /g, '-');
                if($scope.services[categoryId] === null || typeof($scope.services[categoryId]) === 'undefined') {
                    $scope.services[categoryId] = [];
                }
                $scope.services[categoryId].push(service);
            })
            console.log($scope.services)
        };

        $scope.selectCategory = function(category) {
            console.log(category);
            $scope.selectedCategory = category[0].category;
        }

        var map = L.mapbox.map('map', 'justinwoodcock.il70lk8f', {
            shareControl: false
        });
        // Disable drag and zoom handlers.
        map.touchZoom.disable();
        map.scrollWheelZoom.disable();
    }
]);
