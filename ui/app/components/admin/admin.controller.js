'use strict';

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
                        fd.append('uploadFile',file)
                    })                    
                $http.post('http://sugarsd.dev:1337/file/upload', fd,
                {
                    //transformRequest:angular.identity,
                    //headers:{'Content-Type':'multipart/form-data'}
                    headers: { 'Content-Type': undefined },
  transformRequest: function(data) { return data; }
                })
                .success(function(data) {
                    console.log(data.file[0].filename);
                    // do a post here to create image in database.
                }).error(function(data) {
                    console.log(data);
                })
            }
        }
    ])

sugar.controller('AdminController', ['$scope', 'SugarFactory', '$filter', 'ngTableParams', '$upload', '$http', 'Restangular',
    function($scope, SugarFactory, $filter, ngTableParams, $upload, $http, Restangular) {
        $scope.section = {};
        $scope.service = {};
        $scope.data = {};
        $scope.edit = false;
        $scope.alert = {
            show: false
        };

        SugarFactory.getEntity('section').then(function(data) {
            $scope.SectionEntity = data;
            $scope.sections = data.plain();
        })

        SugarFactory.getEntity('contact').then(function(data) {
            $scope.ContactEntity = data;
            $scope.contact = data.plain()[0];
        })

        SugarFactory.getEntity('service').then(function(data) {
            $scope.ServiceEntity = data;
            $scope.services = data.plain();
            console.log($scope.services);
            initTable();
        })

        SugarFactory.getEntity('file').then(function(data) {
            $scope.ImageEntity = data;
            $scope.images = data.plain();
            console.log($scope.images);
        })

        var url = 'http://sugarsd.dev:1337/file/upload';

        new Dropzone('#btn-upload', { // Make the whole body a dropzone
            url: url, // Set the url
            previewsContainer: false // Define the container to display the previews
        });

        $scope.onFileSelect = function($files) {
            console.log('file selected');



            var file = $('input.file-upload')[0].files[0];
            console.log(file);


            // Restangular.all('file/upload').withHttpConfig({transformRequest: angular.identity}).customPOST($files[0]).then(function(data) {
            //     console.log(data);
            //     $scope.ImageEntity.post(data).then(function(data) {
            //             console.log(data);
            //             $scope.images = data.plain();
            //         });
            // }, function(data) {
            //     console.log(data);
            // })

            var postData = {
                uploadFile: {
                    file: file
                }
            }

            Restangular.all('file/upload').withHttpConfig({
                transformRequest: angular.identity
            }).post(postData, {}, {
                'Content-Type': undefined
            }).then(function(data) {
                console.log(data);
                $scope.ImageEntity.post(data).then(function(data) {
                    console.log(data);
                    $scope.images = data.plain();
                });
            }, function(data) {
                console.log(data);
            })




            // $http.post(url, fd, {
            //     transformRequest: angular.identity,
            //     headers: {'Content-Type': undefined}
            // })
            // .success(function(data){
            //     console.log(data);
            // })
            // .error(function(data){
            //     console.log(data);
            // });

            // $files: an array of files selected, each file has name, size, and type.
            //     for (var i = 0; i < $files.length; i++) {
            //         var file = $files[i];
            //         console.log(file);
            //         $scope.upload = $upload.upload({
            //             url: 'http://sugar.dev:1337/file/upload', //upload.php script, node.js route, or servlet url
            //             method: 'POST',
            //             headers: {'Content-Type': 'multipart/form-data'},
            //             //withCredentials: true,
            //             data: {
            //                 uploadFile: file
            //             },
            //             file: file, // or list of files ($files) for html5 only
            //             //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
            //             // customize file formData name ('Content-Disposition'), server side file variable name. 
            //             //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
            //             // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
            //             //formDataAppender: function(formData, key, val){}
            //         }).progress(function(evt) {
            //             console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            //         }).success(function(data, status, headers, config) {
            //             // file is uploaded successfully
            //             console.log(data);
            //             $scope.ImageEntity.post(data).then(function(data) {
            //                 console.log(data);
            //                 $scope.images = data.plain();
            //             });
            //         });
            //     // .error(...)
            //     // .then(success, error, progress); 
            //     // access or attach event listeners to the underlying XMLHttpRequest.
            //     // .xhr(function(xhr){xhr.upload.addEventListener(...)})
            // }
            /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
       It could also be used to monitor the progress of a normal http post/put request with large data*/
            // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.

            $scope.upload = $upload.upload({
                url: url,
                data: {
                    uploadFile: $files[0]
                }
            }).progress(function(evt) {
                $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function(data, status, headers, config) {
                console.log(data);
            }).error(function(data, status, headers, config) {
                console.log('error uploading file.')
            })
        };

        $scope.data.categories = SugarFactory.getCategories();

        $scope.selectCategory = function(item, type) {
            $scope.service[type] = item;
            console.log($scope);
        }

        $scope.selectItemToEdit = function(index) {
            console.log(index);
            $scope.serviceToEdit = index;
        };

        $scope.addService = function() {
            var serviceObject = $scope.service;
            serviceObject.category = $scope.service.category.title;
            if (typeof($scope.service.category.subcategory) !== undefined && $scope.service.category.subcategory !== null) {
                serviceObject.subcategory = $scope.service.subcategory;
            }
            $scope.ServiceEntity.post(serviceObject).then(function(data) {
                $scope.service = {};
                $scope.ServiceEntity.getList().then(function(data) {
                    $scope.ServiceEntity = data;
                    $scope.services = data.plain();
                    $scope.tableParams.reload();
                })
            });
        }

        $scope.editService = function(item, index) {
            var restangularItem = _.filter($scope.ServiceEntity, {
                'id': item.id
            });
            console.log(restangularItem);
            restangularItem[0] = _.merge(restangularItem[0], item);
            restangularItem[0].put().then(function(data) {
                $scope.ServiceEntity.getList().then(function(data) {
                    $scope.ServiceEntity = data;
                    $scope.services = data.plain();
                    $scope.tableParams.reload();
                })
            });
        }

        $scope.deleteService = function(item, index) {

            var restangularItem = _.filter($scope.ServiceEntity, {
                'id': item.id
            });
            itemToDelete[0].remove().then(function(data) {
                $scope.ServiceEntity.getList().then(function(data) {
                    $scope.ServiceEntity = data;
                    $scope.services = data.plain();
                    $scope.tableParams.reload();
                })
            });
        }

        $scope.create = function() {
            $scope.SectionEntity.post($scope.section).then(function(data) {
                $scope.section = {};
                $scope.showForm = false;
                $scope.alert = {
                    show: true,
                    message: 'The section has been successfully created!',
                    type: 'success'
                };
                clearAlert();
            }, function(data) {
                $scope.alert = {
                    show: true,
                    message: 'Oops, something went wrong! Please try again.',
                    type: 'danger'
                };
                clearAlert();
            });
        };

        $scope.update = function() {
            delete $scope.section['$$hashKey']
            $scope.SectionEntity[$scope.editIndex].put($scope.section).then(function(data) {
                $scope.edit = false;
                $scope.section = {};
                $scope.showForm = false;
                $scope.alert = {
                    show: true,
                    message: 'The section has been successfully updated!',
                    type: 'success'
                };
                clearAlert();
            }, function(data) {
                $scope.alert = {
                    show: true,
                    message: 'Oops, something went wrong! Please try again.',
                    type: 'danger'
                };
                clearAlert();
            });
        };

        $scope.addSection = function() {
            $scope.edit = false;
            $scope.showForm = true;
            $scope.section = {};
        }

        $scope.editMode = function() {
            $scope.edit = true;
            $scope.showForm = true;
        }

        $scope.editSection = function(item, $index) {
            $scope.editIndex = $index;
            $scope.section = item;
        }

        function clearAlert() {
            setTimeout(function() {
                $scope.alert = {
                    show: false
                };
                $scope.$apply();
            }, 5000)
        }

        $scope.updateContact = function() {
            console.log($scope.contact)
            $scope.ContactEntity[0].put($scope.contact).then(function(data) {
                console.log(data);
            });
        }

        function initTable() {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                groupBy: 'category',
                total: $scope.services.length,
                getData: function($defer, params) {
                    var orderedData = params.sorting() ?
                        $filter('orderBy')($scope.services, $scope.tableParams.orderBy()) :
                        $scope.services;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }

    }
]);