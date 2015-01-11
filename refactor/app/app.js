'use strict';

var sugar = angular.module('sugar', [
    'ui.router',
    'ui.bootstrap',
    'duParallax',
    'textAngular',
    'ngSanitize',
    'restangular',
    'ngTable',
    'angularFileUpload'
]);

sugar.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $stateProvider.state('home', {
        url: '/',
        views: {
            content: {
                templateUrl: 'components/sections/sections.index.html',
                controller: 'SectionsController'
            },
            header: {
                templateUrl: 'components/header/header.index.html'
            },
            footer: {
                templateUrl: 'components/footer/footer.index.html'
            }
        },
        authenticate: false
    }).state('admin', {
        abstract: true,
        url: '/admin',
        views: {
            header: {
                templateUrl: 'components/header/admin-header.index.html'
            },
            footer: {
                templateUrl: 'components/footer/admin-footer.index.html'
            }
        },
        authenticate: true
    }).state('admin-images', {
        url: '/admin/images',
        views: {
            header: {
                templateUrl: 'components/header/admin-header.index.html'
            },
            footer: {
                templateUrl: 'components/footer/admin-footer.index.html'
            },
            content: {
                templateUrl: 'components/admin/images.html',
                controller: 'AdminImagesController'
            }
        },
        authenticate: true
    }).state('admin-sections', {
        url: '/admin/sections',
        views: {
            header: {
                templateUrl: 'components/header/admin-header.index.html'
            },
            footer: {
                templateUrl: 'components/footer/admin-footer.index.html'
            },
            content: {
                templateUrl: 'components/admin/sections.html',
                controller: 'AdminSectionsController'
            }
        },
        authenticate: true
    }).state('admin-services', {
        url: '/admin/services',
        views: {
            header: {
                templateUrl: 'components/header/admin-header.index.html'
            },
            footer: {
                templateUrl: 'components/footer/admin-footer.index.html'
            },
            content: {
                templateUrl: 'components/admin/services.html',
                controller: 'AdminServicesController'
            }
        },
        authenticate: true
    }).state('admin-specials', {
        url: '/admin/specials',
        views: {
            header: {
                templateUrl: 'components/header/admin-header.index.html'
            },
            footer: {
                templateUrl: 'components/footer/admin-footer.index.html'
            },
            content: {
                templateUrl: 'components/admin/specials.html',
                controller: 'AdminSpecialsController'
            }
        },
        authenticate: true
    }).state('admin-contact', {
        url: '/admin/contact',
        views: {
            header: {
                templateUrl: 'components/header/admin-header.index.html'
            },
            footer: {
                templateUrl: 'components/footer/admin-footer.index.html'
            },
            content: {
                templateUrl: 'components/admin/contact.html',
                controller: 'AdminContactController'
            }
        },
        authenticate: true
    }).state('login', {
        url: '/login',
        views: {
            content: {
                templateUrl: 'components/login/login.index.html',
                controller: 'LoginController'
            },
            header: {
                templateUrl: 'components/header/header.index.html'
            },
            footer: {
                templateUrl: 'components/footer/footer.index.html'
            }
        },
        authenticate: false
    });
    $urlRouterProvider.otherwise('/');
});

sugar.config(['RestangularProvider',
    function(RestangularProvider) {
        //var apiUrl = 'http://sugarsd.dev:1337';
        var apiUrl = 'http://api.sugarsandiego.com';
        RestangularProvider
        .setBaseUrl(apiUrl)
        .setDefaultHttpFields({
            withCredentials: true
        })
        .setDefaultHeaders({
            'Content-Type': 'application/json'
        });

    }
]);

sugar.run(['$rootScope', '$state', 'AuthFactory', 'Restangular',
    function($rootScope, $state, AuthFactory, Restangular) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            var hasAuth = AuthFactory.check();
            if (toState.authenticate && !hasAuth) {
                // User isn’t authenticated
                $state.go('login');
                event.preventDefault();
                window.location.reload();
            }
        });
    }
]);