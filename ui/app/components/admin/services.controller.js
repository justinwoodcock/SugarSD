'use strict';

sugar.controller('AdminServicesController', ['$scope', 'SugarFactory', '$filter', 'ngTableParams',
    function($scope, SugarFactory, $filter, ngTableParams) {
        $scope.service = {};
        $scope.data = {};
        $scope.edit = false;
        $scope.showForm = false;
        $scope.alert = {
            show: false
        };
        var initialLoad = true;

        getServiceEntity();

        function getServiceEntity() {
            SugarFactory.getEntity('service').then(function(data) {
                $scope.ServiceEntity = data;
                $scope.services = data.plain();
                if (initialLoad === true) {
                    initTable();
                    initialLoad = false;
                    return;
                }
                $scope.tableParams.reload();
            })
        };

        $scope.data.categories = SugarFactory.getCategories();

        $scope.selectCategory = function(item, type) {
            $scope.service[type] = item;
            console.log($scope);
        }

        $scope.selectItemToEdit = function(item) {
            console.log(item);
            //$scope.serviceToEdit = index;
            $scope.service = item;
            $scope.showForm = true;
        };

        $scope.addService = function() {
            var serviceObject = $scope.service;
            serviceObject.category = $scope.service.category.title;
            $scope.ServiceEntity.post(serviceObject).then(function(data) {
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

        $scope.editService = function(item) {
            var restangularItem = _.filter($scope.ServiceEntity, {
                'id': item.id
            });
            restangularItem[0] = _.merge(restangularItem[0], item);
            restangularItem[0].put().then(function(data) {
                $scope.alert = {
                    show: true,
                    message: 'The service has been successfully updated!',
                    type: 'success'
                };
                clearAlert();
                getServiceEntity();
            }, function(data) {
                $scope.alert = {
                    show: true,
                    message: 'Oops, something went wrong! Please try again.',
                    type: 'danger'
                };
                clearAlert();
            });
        };

        $scope.deleteService = function(item) {
            var restangularItem = _.filter($scope.ServiceEntity, {
                'id': item.id
            });
            restangularItem[0].remove().then(function(data) {
                $scope.alert = {
                    show: true,
                    message: 'The service has been successfully deleted.',
                    type: 'success'
                };
                clearAlert();
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
                groupBy: 'category',
                total: $scope.services.length,
                getData: function($defer, params) {
                    var orderedData = params.sorting() ?
                        $filter('orderBy')($scope.services, $scope.tableParams.orderBy()) :
                        $scope.services;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        };
    }
]);