'use strict';

sugar.controller('SugarController', ['$scope', 'parallaxHelper', '$modal', '$http', '$rootScope', '$state', 'AuthFactory',
    function($scope, parallaxHelper, $modal, $http, $rootScope, $state, AuthFactory) {
        $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);

        //$scope.background = parallaxHelper.createAnimator(-0.3);

        $scope.openBooking = function() {

            console.log('booking');

            var modalAppointmentBooking = $modal.open({
                templateUrl: 'components/sections/schedulicity.html',
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

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $scope.state = toState;
            $scope.state.nicename = toState.name.replace(/-/g, ' ');
        });

        $scope.checkAuth = function() {
            $scope.hasAuth = AuthFactory.check();
            return $scope.hasAuth;
        }

        $scope.logout = function() {
            AuthFactory.logout();
            $state.go('login');
        };

    }
]);
