'use strict';

sugar.controller('SpecialsController', ['$scope', 'SugarFactory', '$modal',
    function($scope, SugarFactory, $modal) {
        SugarFactory.getEntity('special').then(function(data) {
            $scope.specials = data.plain();
        });
        $scope.close = function() {
            $scope.$parent.$parent.$close();
        }
        $scope.book = function() {
            $scope.close();
            var modalAppointmentBooking = $modal.open({
                templateUrl: 'components/sections/schedulicity.html',
                //controller: ModalInstanceCtrl,
                //size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                },
                windowClass: 'appointments'
            });
            modalAppointmentBooking.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }
    }
]);