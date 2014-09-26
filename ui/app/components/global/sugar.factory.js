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
                        description: '', 
                        subcategories: [

                        ]
                    },
                    {
                        title: 'Sugaring',
                        description: '', 
                        subcategories: [
                            'Bikini',
                            'Body', 
                            'Face', 
                            'For the gents'
                        ]
                    }
                ]
            }
        }
    }

]);