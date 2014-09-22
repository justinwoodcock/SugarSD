'use strict';

sugar.controller('AdminController', ['$scope', 'SugarFactory',
    function($scope, SugarFactory) {
        $scope.section = {};
        $scope.edit = false;
        $scope.alert = {
            show: false
        };

        SugarFactory.getEntity('section').then(function(data) {
            $scope.SectionEntity = data;
            $scope.sections = data.plain();
        })

        $scope.create = function() {
            $scope.SectionEntity.post($scope.section).then(function(data) {
                $scope.section = {};
                $scope.showForm = false;
                $scope.alert = {
                    show: true,
                    message: 'The section has been successfully created!',
                    type: 'success'
                };
                clearAlert();
            }, function(data) {
                $scope.alert = {
                    show: true,
                    message: 'Oops, something went wrong! Please try again.',
                    type: 'danger'
                };
                clearAlert();
            });
        };

        $scope.update = function() {
            delete $scope.section['$$hashKey']
            $scope.SectionEntity[$scope.editIndex].put($scope.section).then(function(data) {
                $scope.edit = false;
                $scope.section = {};
                $scope.showForm = false;
                $scope.alert = {
                    show: true,
                    message: 'The section has been successfully updated!',
                    type: 'success'
                };
                clearAlert();
            }, function(data) {
                $scope.alert = {
                    show: true,
                    message: 'Oops, something went wrong! Please try again.',
                    type: 'danger'
                };
                clearAlert();
            });
        };

        $scope.addSection = function() {
            $scope.edit = false;
            $scope.showForm = true;
            $scope.section = {};
        }

        $scope.editMode = function() {
            $scope.edit = true;
            $scope.showForm = true;
        }

        $scope.editSection = function(item, $index) {
            $scope.editIndex = $index;
            $scope.section = item;
        }

        function clearAlert() {
            setTimeout(function(){
                $scope.alert = {
                    show: false
                };
                $scope.$apply();
            }, 5000)
        }
    }
]);