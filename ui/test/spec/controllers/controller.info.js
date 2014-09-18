describe('InfoController', function() {
    var scope, $httpBackend;

    beforeEach(function() {
        module('uiBase');

        inject(function($injector) {
            var $rootScope, $controller;
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            scope = $rootScope.$new();

            $controller('InfoController', {
                $scope: scope
            });
        });
    });

    afterEach(function() {
        scope.$destroy();
    });

    it('should be an array', function() {
        expect(scope.version).toBe('0.0.1');
    });

});