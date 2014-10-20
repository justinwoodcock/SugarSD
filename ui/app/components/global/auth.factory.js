sugar.factory('AuthFactory', ['Restangular', 'SugarFactory',
    function(Restangular, SugarFactory) {
        var hasAuth = false;
        var token = '';
        return {
            login: function(creds) {
                var self = this;
                Restangular.one('auth', 'login').get(creds).then(function(data) {
                    self.getToken();
                }, function(data) {
                    console.log(data);
                });
            },
            getToken: function() {
                Restangular.one('user', 'jwt').get().then(function(data) {
                    hasAuth = true;
                    token = data.token;
                    Restangular.setDefaultHeaders({
                        access_token: data.token
                    });
                    return token;
                }, function(data) {
                    console.log(data);
                });
            },
            logout: function() {
                Restangular.one('auth', 'logout').get().then(function(data) {
                    Restangular.setDefaultHeaders({
                        access_token: null
                    });
                    hasAuth = false;
                    var storage = SugarFactory.getStorage();
                    storage.session.hasAuth = false;
                    SugarFactory.setStorage(storage);
                }, function(data) {
                    console.log(data);
                });
            },
            check: function() {
                if (!hasAuth) {
                    var storage = SugarFactory.getStorage();
                    if(!_.isEmpty(storage.session)) {
                        hasAuth = storage.session.hasAuth;
                    }
                }
                return hasAuth;
            },
            token: function() {
                return token;
            }
        }
    }

]);