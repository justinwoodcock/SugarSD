'use strict';

sugar.controller('SugarController', ['$scope', 'parallaxHelper', '$modal', '$http', '$rootScope', '$state', 'AuthFactory', 'SugarFactory',
    function($scope, parallaxHelper, $modal, $http, $rootScope, $state, AuthFactory, SugarFactory) {
        $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);
        $scope.openBooking = function() {
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
            if(!$scope.$$childHead.navbarCollapsed) {
                $scope.$$childHead.navbarCollapsed = !$scope.$$childHead.navbarCollapsed;
            }
        };
        $scope.viewSpecials = function() {
            $scope.modalSpecials = $modal.open({
                templateUrl: 'components/global/specials.html',
                //controller: ModalInstanceCtrl,
                //size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                },
                windowClass: 'specials'
            });
            $scope.modalSpecials.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };
        SugarFactory.getEntity('special').then(function(data) {
            $scope.specials = data.plain();
            checkSpecialsDate();
        });
        function checkSpecialsDate() {
            //var now = new Date();
            //var last = local
            //var newestDate = null;
            var storedDate = JSON.parse(localStorage.getItem('specials'));
            if(storedDate === null) {
                var todayValue = new Date().valueOf();
                localStorage.setItem('specials', JSON.stringify(todayValue));
                $scope.viewSpecials();
            } else {
                var newestDate = null;
                _.forEach($scope.specials, function(special) {
                    // console.log(special);
                    var updateDate = new Date(special.updatedAt).valueOf();
                    if(updateDate > storedDate || updateDate > newestDate || newestDate === null) {
                        newestDate = updateDate;
                    }
                })
                if (newestDate > storedDate) {
                    localStorage.setItem('specials', JSON.stringify(newestDate));
                    $scope.viewSpecials();
                }
            }
        }
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
