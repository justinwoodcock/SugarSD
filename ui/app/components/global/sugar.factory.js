sugar.factory('SugarFactory', ['Restangular',
    function(Restangular) {
        return {
            getEntity: function(entity) {
                return Restangular.all(entity).getList();
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
            }
        }
    }

]);