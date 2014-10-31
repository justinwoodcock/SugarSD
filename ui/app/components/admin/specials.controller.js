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
            $scope.special = item;
            $scope.showForm = true;
            $scope.edit = true;
        };

        $scope.editItem = function() {
            var restangularItem = _.filter($scope.SpecialEntity, {
                'id': $scope.special.id
            });
            restangularItem[0] = _.merge(restangularItem[0], $scope.special);
            restangularItem[0].put().then(function(data) {
                $scope.showForm = false;
                $scope.edit = false;
                $scope.special = {};
                $scope.alert = {
                    show: true,
                    message: 'The special has been successfully updated!',
                    type: 'success'
                };
                clearAlert();
                getSpecialEntity();
            }, function(data) {
                $scope.special = {};
                $scope.alert = {
                    show: true,
                    message: 'Oops, something went wrong! Please try again.',
                    type: 'danger'
                };
                clearAlert();
            });
        };

        $scope.create = function() {
            $scope.SpecialEntity.post($scope.special).then(function(data) {
                $scope.alert = {
                    show: true,
                    message: 'The special has been successfully added!',
                    type: 'success'
                };
                clearAlert();
                $scope.showForm = false;
                $scope.special = {};
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
                count: 10, // count per page
                sorting: {
                    name: 'asc' // initial sorting
                }
            }, {
                total: $scope.specials.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ?
                        $filter('orderBy')($scope.specials, params.orderBy()) :
                        $scope.specials;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

        }

    }
]);