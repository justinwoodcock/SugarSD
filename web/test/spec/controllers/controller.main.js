describe('MainController', function() {
    var scope, $httpBackend;

    beforeEach(function() {
        module('uiBase');

        inject(function($injector) {
            var $rootScope, $controller;
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            scope = $rootScope.$new();

            $controller('MainController', {
                $scope: scope
            });
        });
    });

    afterEach(function() {
        scope.$destroy();
    });

    it('should be an array', function() {
        expect(scope.test).toBe('stubbing out test');
    });

});