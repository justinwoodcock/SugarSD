'use strict';

sugar.controller('InfoController', ['$scope',
    function($scope) {
        $scope.version = '0.0.1';
        $scope.todos = [
            {
                title: 'Absolute states',
                description: 'change ui-router config so that it uses child/parent views.',
                githubUrl: 'https://github.com/justinwoodcock',
                completed: false
            }, 
            // {
            //     title: 'title',
            //     description: 'description',
            //     githubUrl: 'https://github.com/justinwoodcock',
            //     completed: false
            // }
        ]
    }
]);