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
    $stateProvider.state('sections', {
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
        url: '/admin',
        views: {
            content: {
                templateUrl: 'components/admin/index.html',
                controller: 'AdminController'
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
        // RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        //     var extractedData = data.data;
        //     return extractedData;
        // });
    }
]);
