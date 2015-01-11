'use strict';

sugar.controller('AdminContactController', ['$scope', 'SugarFactory', '$filter', 'ngTableParams', '$upload', '$http', 'Restangular',
    function($scope, SugarFactory, $filter, ngTableParams, $upload, $http, Restangular) {
        $scope.section = {};
        $scope.service = {};
        $scope.data = {};
        $scope.edit = false;
        $scope.alert = {
            show: false
        };

        SugarFactory.getEntity('contact').then(function(data) {
            $scope.ContactEntity = data;
            $scope.contact = data.plain()[0];
        }, function(data) {
            console.log(data);
        });

        function clearAlert() {
            setTimeout(function() {
                $scope.alert = {
                    show: false
                };
                $scope.$apply();
            }, 5000)
        };

        $scope.updateContact = function() {
            $scope.ContactEntity[0].put($scope.contact).then(function(data) {
                $scope.alert = {
                    show: true,
                    message: 'Your contact information has been successfully updated!',
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

    }
]);