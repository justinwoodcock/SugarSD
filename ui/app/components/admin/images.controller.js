'use strict';

sugar.controller('AdminImagesController', ['$scope', 'SugarFactory', '$filter', '$upload',
    function($scope, SugarFactory, $filter, $upload) {
        $scope.section = {};
        $scope.edit = false;
        $scope.alert = {
            show: false
        };
        getImageEntity();
        function getImageEntity() {
            SugarFactory.getEntity('file').then(function(data) {
                $scope.ImageEntity = data;
                $scope.images = data.plain();
            })
        }

        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: 'http://api.sugarsandiego.com/file/upload',
                    data: {
                        files: file
                    }
                }).progress(function(evt) {
                    $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    console.log('data', data.file[0]);
                    // var imageObject = {
                    //     name: data.file[0].filename,
                    //     size: data.file[0].size,
                    //     type: data.file[0].type
                    // };
                    var imageObject = data.file[0];
                    imageObject.storedAs = imageObject.fd.replace('/var/www/SugarSD/ui/dist/images/', '');
                    $scope.ImageEntity.post(imageObject).then(function(data) {
                        getImageEntity();
                        $scope.alert = {
                            show: true,
                            message: imageObject.name + ' has been uploaded.',
                            type: 'success'
                        }
                        clearAlert();
                    });
                }).error(function(data, status, headers, config) {
                    console.log('error uploading file.')
                })
            };
        };

        $scope.deleteImage = function(image, $index) {
            $scope.ImageEntity[$index].remove().then(function(data) {
                $scope.alert = {
                    show: true,
                    message: image.name + ' has been deleted.',
                    type: 'success'
                }
                clearAlert();
                getImageEntity();
            })
        };

        $scope.getLink = function(image) {
            prompt('The image url is:', '/images/uploads/' + image.name)
        };

        function clearAlert(duration) {
            if (!duration) var duration = 5000;
            setTimeout(function() {
                $scope.alert = {
                    show: false
                };
                $scope.$apply();
            }, duration)
        };
    }
]);