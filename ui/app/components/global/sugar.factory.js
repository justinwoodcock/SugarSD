sugar.factory('SugarFactory', ['Restangular',
    function(Restangular) {
        return {
            getEntity: function(entity) {
                return Restangular.all(entity).getList();
            },
            createEntity: function(entity) {
                return Restangular.all(entity);
            },
            getCategories: function() {
                return [
                    {
                        title: 'Sunless Spray Tanning',
                        id: 'sunless-spray-tanning',
                        description: '',
                    },
                    {
                        title: 'Bikini',
                        id: 'bikini',
                        description: ''
                    },
                    {
                        title: 'Body',
                        id: 'body',
                        description: ''
                    },
                    {
                        title: 'Face',
                        id: 'face',
                        description: 'description'
                    },
                    {
                        title: 'For the gents',
                        id: 'for-the-gents',
                        description: 'description'
                    }
                ]
            },
            getStorage: function() {
                var data = localStorage.getItem('sugar');
                if (data.toString() === '[object Object]') {
                    return {};
                }
                return JSON.parse(data);
            },
            setStorage: function(object) {
                var data = JSON.stringify(object);
                localStorage.setItem('sugar', data);
            },
        }
    }

]);