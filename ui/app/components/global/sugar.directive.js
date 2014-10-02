sugar.directive('fileInput',['$parse',function($parse){
        return {
            restrict:'A',
            link:function(scope,elm,attrs){
                elm.bind('change',function(){
                    $parse(attrs.fileInput)
                    .assign(scope,elm[0].files)
                    scope.$apply()
                })
            }
        }
    }])

sugar.controller('uploader', ['$scope', '$http',
        function($scope, $http) {
                $scope.filesChanged = function(elm){
                    $scope.files=elm.files
                    $scope.$apply();
                }
            $scope.upload = function() {
                    var fd = new FormData()
                    angular.forEach($scope.files,function(file){
                        fd.append('file',file)
                    })
                $http.post('upload', fd,
                {
                    transformRequest:angular.identity,
                    headers:{'Content-Type':undefined}
                })
                .success(function(d) {
                    console.log(d)
                })
            }
        }
    ])