'use strict';

uiBase.controller('SugarController', ['$scope', 'parallaxHelper', '$modal',
    function($scope, parallaxHelper, $modal) {
        //$scope.navbarCollapsed = true;

        $scope.$watch('navbarCollapsed', function() {
            console.log($scope.navbarCollapsed);
        })
        // you're welcome for the controller.
        $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);

        //$scope.background = parallaxHelper.createAnimator(-0.3);

        $scope.openBooking = function() {

            console.log('booking');

            var modalAppointmentBooking = $modal.open({
                templateUrl: 'views/main/schedulicity.html',
                //controller: ModalInstanceCtrl,
                //size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });

            modalAppointmentBooking.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

    }
]);
