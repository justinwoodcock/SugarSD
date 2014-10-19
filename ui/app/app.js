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
                templateUrl: 'components/sections/index.html',
                controller: 'SectionsController'
            },
            header: {
                templateUrl: 'components/header/index.html'
            },
            footer: {
                templateUrl: 'components/footer/index.html'
            }
        }
    }).state('admin', {
        abstract: true,
        url: '/admin',
        views: {
            header: {
                templateUrl: 'components/header/admin.html'
            },
            footer: {
                templateUrl: 'components/footer/index.html'
            }
        }
    }).state('admin-images', {
        url: '/admin/images',
        views: {
            header: {
                templateUrl: 'components/header/admin.html'
            },
            footer: {
                templateUrl: 'components/footer/index.html'
            },
            content: {
                templateUrl: 'components/admin/images.html',
                controller: 'AdminImagesController'
            }
        }
    }).state('admin-sections', {
        url: '/admin/sections',
        views: {
            header: {
                templateUrl: 'components/header/admin.html'
            },
            footer: {
                templateUrl: 'components/footer/index.html'
            },
            content: {
                templateUrl: 'components/admin/sections.html',
                controller: 'AdminSectionsController'
            }
        }
    }).state('admin-services', {
        url: '/admin/services',
        views: {
            header: {
                templateUrl: 'components/header/admin.html'
            },
            footer: {
                templateUrl: 'components/footer/index.html'
            },
            content: {
                templateUrl: 'components/admin/services.html',
                controller: 'AdminServicesController'
            }
        }
    }).state('admin-contact', {
        url: '/admin/contact',
        views: {
            header: {
                templateUrl: 'components/header/admin.html'
            },
            footer: {
                templateUrl: 'components/footer/index.html'
            },
            content: {
                templateUrl: 'components/admin/contact.html',
                controller: 'AdminContactController'
            }
        }
    }).state('login', {
        url: '/login',
        views: {
            content: {
                templateUrl: 'components/login/index.html',
                controller: 'LoginController'
            },
            header: {
                templateUrl: 'components/header/index.html'
            },
            footer: {
                templateUrl: 'components/footer/index.html'
            }
        }
    });
    $urlRouterProvider.otherwise('/');
});

sugar.config(['RestangularProvider',
    function(RestangularProvider) {
        var apiUrl = 'http://sugarsd.dev:1337';
        RestangularProvider.setBaseUrl(apiUrl);
        RestangularProvider.setDefaultHttpFields({
            withCredentials: true
        });
    }
]);