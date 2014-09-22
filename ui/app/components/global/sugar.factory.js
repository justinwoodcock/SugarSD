sugar.factory('SugarFactory', ['Restangular',
    function(Restangular) {
        return {
            getEntity: function(entity) {
                return Restangular.all(entity).getList();
            }
        }
    }

]);