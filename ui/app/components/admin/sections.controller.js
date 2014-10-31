'use strict';

sugar.controller('AdminSectionsController', ['$scope', 'SugarFactory', '$filter', 'ngTableParams', '$upload', '$http', 'Restangular',
    function($scope, SugarFactory, $filter, ngTableParams, $upload, $http, Restangular) {
        $scope.section = {};
        $scope.data = {};
        $scope.edit = false;
        $scope.alert = {
            show: false
        };

        getSectionEntity();
        function getSectionEntity() {
            SugarFactory.getEntity('section').then(function(data) {
                $scope.SectionEntity = data;
                $scope.sections = data.plain();
            });
        };

        SugarFactory.getEntity('file').then(function(data) {
            $scope.images = data.plain();
        });

        $scope.create = function() {
            $scope.SectionEntity.post($scope.section).then(function(data) {
                getSectionEntity();
                $scope.section = {};
                $scope.showForm = false;
                $scope.editIndex = null;
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
        };

        $scope.editSection = function(item, $index) {
            if(_.isEmpty($scope.section) === false && $scope.section.title === item.title) {
                $scope.cancel();
                return;
            }
            $scope.edit = true;
            $scope.showForm = true;
            $scope.editIndex = $index;
            $scope.section = item;
        };

        $scope.cancel = function() {
            $scope.edit = false;
            $scope.section = {};
            $scope.editIndex = null;
            $scope.showForm = false;
        };

        $scope.delete = function(item, $index) {
            $scope.SectionEntity[$index].remove().then(function(data) {
                $scope.alert = {
                    show: true,
                    message: 'The ' + item.title + ' section has been deleted.',
                    type: 'success'
                }
                clearAlert();
                getSectionEntity();
            })
        };

        function clearAlert(duration) {
            if(!duration) var duration = 5000;
            setTimeout(function() {
                $scope.alert = {
                    show: false
                };
                $scope.$apply();
            }, duration)
        }

    }
]);