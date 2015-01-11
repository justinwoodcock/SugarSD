'use strict';

sugar.controller('AdminController', ['$scope', 'SugarFactory', '$filter', 'ngTableParams', '$upload', '$http', 'Restangular',
    function($scope, SugarFactory, $filter, ngTableParams, $upload, $http, Restangular) {
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
        })

        SugarFactory.getEntity('service').then(function(data) {
            $scope.ServiceEntity = data;
            $scope.services = data.plain();
            console.log($scope.services);
            initTable();
        })

        SugarFactory.getEntity('file').then(function(data) {
            $scope.ImageEntity = data;
            $scope.images = data.plain();
        })

        $scope.onFileSelect = function($files) {            
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: 'http://sugarsd.dev:1337/file/upload',
                    data: {
                        files: file
                    }
                }).progress(function(evt) {
                    $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    var imageObject = {
                        name: data.file[0].filename,
                        size: data.file[0].size,
                        type: data.file[0].type
                    }
                    $scope.ImageEntity.post(imageObject).then(function(data) {
                        $scope.images = data.plain();
                    });
                }).error(function(data, status, headers, config) {
                    console.log('error uploading file.')
                })
            };
        };

        $scope.deleteImage = function(image, $index) {
            console.log('index: ', $index);
            console.log('image: ', image);
            $scope.ImageEntity[$index].remove().then(function(data) {
                console.log('image deleted: ', data)
            })
        }

        $scope.data.categories = SugarFactory.getCategories();

        $scope.selectCategory = function(item, type) {
            $scope.service[type] = item;
        }

        $scope.selectItemToEdit = function(index) {
            $scope.serviceToEdit = index;
        };

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

        $scope.editService = function(item, index) {
            var restangularItem = _.filter($scope.ServiceEntity, {
                'id': item.id
            });
            restangularItem[0] = _.merge(restangularItem[0], item);
            restangularItem[0].put().then(function(data) {
                $scope.ServiceEntity.getList().then(function(data) {
                    $scope.ServiceEntity = data;
                    $scope.services = data.plain();
                    $scope.tableParams.reload();
                })
            });
        }

        $scope.deleteService = function(item, index) {

            var restangularItem = _.filter($scope.ServiceEntity, {
                'id': item.id
            });
            itemToDelete[0].remove().then(function(data) {
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
            setTimeout(function() {
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