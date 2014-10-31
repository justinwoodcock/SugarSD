'use strict';

sugar.controller('AdminSpecialsController', ['$scope', 'SugarFactory', '$filter', 'ngTableParams',
    function($scope, SugarFactory, $filter, ngTableParams) {
        $scope.special = {};
        $scope.data = {};
        $scope.edit = false;
        $scope.showForm = false;
        $scope.alert = {
            show: false
        };
        var initialLoad = true;

        getSpecialEntity();

        function getSpecialEntity() {
            SugarFactory.getEntity('special').then(function(data) {
                $scope.SpecialEntity = data;
                $scope.specials = data.plain();
                if (initialLoad === true) {
                    initTable();
                    initialLoad = false;
                    return;
                }
                $scope.tableParams.reload();
            })
        };

        $scope.selectItemToEdit = function(item) {
            console.log(item);
            $scope.service = item;
            $scope.showForm = true;
            $scope.edit = true;
        };

        $scope.edit = function() {
            console.log($scope.service);
            var restangularItem = _.filter($scope.ServiceEntity, {
                'id': $scope.service.id
            });
            console.log(restangularItem);
            restangularItem[0] = _.merge(restangularItem[0], $scope.service);
            restangularItem[0].put().then(function(data) {
                $scope.showForm = false;
                $scope.edit = false;
                $scope.service = {};
                $scope.alert = {
                    show: true,
                    message: 'The service has been successfully updated!',
                    type: 'success'
                };
                clearAlert();
                getServiceEntity();
            }, function(data) {
                $scope.service = {};
                $scope.alert = {
                    show: true,
                    message: 'Oops, something went wrong! Please try again.',
                    type: 'danger'
                };
                clearAlert();
            });
        };

        $scope.create = function() {
            $scope.SpecialEntity.post($scope.service).then(function(data) {
                $scope.alert = {
                    show: true,
                    message: 'The service has been successfully added!',
                    type: 'success'
                };
                clearAlert();
                $scope.showForm = false;
                $scope.service = {};
                getServiceEntity();
            }, function(data) {
                console.log(data);
                $scope.alert = {
                    show: true,
                    message: 'Oops, something went wrong! Please try again.',
                    type: 'danger'
                };
                clearAlert();
            });
        }

        $scope.delete = function(item) {
            var restangularItem = _.filter($scope.SpecialEntity, {
                'id': item.id
            });
            restangularItem[0].remove().then(function(data) {
                $scope.alert = {
                    show: true,
                    message: 'The special has been successfully deleted.',
                    type: 'success'
                };
                clearAlert();
                getSpecialEntity();
            }, function(data) {
                console.log(data);
                $scope.alert = {
                    show: true,
                    message: 'Oops, something went wrong! Please try again.',
                    type: 'danger'
                };
                clearAlert();
            });
        };

        function clearAlert() {
            setTimeout(function() {
                $scope.alert = {
                    show: false
                };
                $scope.$apply();
            }, 5000)
        };

        function initTable() {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                total: $scope.specials.length,
                getData: function($defer, params) {
                    var orderedData = params.sorting() ?
                        $filter('orderBy')($scope.specials, $scope.tableParams.orderBy()) :
                        $scope.specials;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        };
    }
]);