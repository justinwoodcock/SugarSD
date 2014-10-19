sugar.factory('AuthFactory', ['Restangular',
    function(Restangular) {
        var hasAuth = false;
        var token = '';
        return {
            login: function(creds) {
                var self = this;
                Restangular.one('auth', 'login').get(creds).then(function(data) {
                    self.getToken();
                    console.log(data);
                }, function(data) {
                    console.log(data);
                });
            },
            getToken: function() {
                Restangular.one('user', 'jwt').get().then(function(data) {
                    console.log(data);
                    hasAuth = true;
                    token = data.token;
                    Restangular.setDefaultHeaders({
                        access_token: data.token
                    });
                    console.log(Restangular);
                }, function(data) {
                    console.log(data);
                });
            },
            logout: function() {
                Restangular.one('auth', 'logout').get().then(function(data) {
                    console.log(data);
                    Restangular.setDefaultHeaders({
                        access_token: null
                    });
                    hasAuth = false;
                }, function(data) {
                    console.log(data);
                });
            },
            check: function() {
                return hasAuth;
            },
            token: function() {
                return token;
            }
        }
    }

]);