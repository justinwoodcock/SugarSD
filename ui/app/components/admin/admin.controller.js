'use strict';

sugar.controller('AdminController', ['$scope', 'SugarFactory', '$filter', 'ngTableParams',
    function($scope, SugarFactory, $filter, ngTableParams) {
        $scope.section = {};
        $scope.service = {};
        $scope.data = {};
        $scope.edit = false;
        $scope.alert = {
            show: false
        };

        SugarFactory.getEntity('section').then(function(data) {
            $scope.SectionEntity = data;
            $scope.sections = data.plain();
        })

        SugarFactory.getEntity('contact').then(function(data) {
            $scope.ContactEntity = data;
            $scope.contact = data.plain()[0];
            console.log($scope.contact)
        })

        SugarFactory.getEntity('service').then(function(data) {
            $scope.ServiceEntity = data;
            $scope.services = data.plain();
            console.log($scope.services);
            initTable();
        })

        $scope.data.categories = SugarFactory.getCategories();

        $scope.selectCategory = function(item, type) {
            $scope.service[type] = item;
            console.log($scope);
        }

        $scope.addService = function() {
            var serviceObject = $scope.service;
            serviceObject.category = $scope.service.category.title;
            if (typeof($scope.service.category.subcategory) !== undefined && $scope.service.category.subcategory !== null) {
                serviceObject.subcategory = $scope.service.subcategory;
            }
            $scope.ServiceEntity.post(serviceObject).then(function(data) {
                $scope.service = {};
                $scope.ServiceEntity.getList().then(function(data) {
                    $scope.ServiceEntity = data;
                    $scope.services = data.plain();
                    $scope.tableParams.reload();
                })
            });
        }

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

        $scope.updateContact = function() {
            console.log($scope.contact)
            $scope.ContactEntity[0].put($scope.contact).then(function(data) {
                console.log(data);
            });
        }

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
        }
        
    }
]);