#UI Base
UI Base is a launch pad for Angular webapps that speeds up the take-off

##Dependencies
These dependencies need to be installed before trying to fire up the project.

1. [node](http://nodejs.org/): follow the link and click the button
2. [ruby](https://www.ruby-lang.org/en/installation/): you should have a mac and if you do it's already there
3. `gem install sass` && `gem install compass`
4. `npm install grunt grunt-cli bower -g` installs grunt, grunt-cli & bower globally.

##Instructions
Follow these instructions to fire up ui-base after ensuring you have all dependencies listed above installed in your environment.

1. in terminal, navigate to the root directory (where Gruntfile.js is located)
	* install node modules: `npm install`
    * install bower packages: `bower install`
2. in the same directory run one of the following commands
	* `grunt serve`: runs all dev tasks
    * `grunt test`: runs all jasmine unit tests
    * `grunt build`: runs build tasks that minify & concat code and outputs the files to the `/dist` directory.
    
##Thirdparty Resources
These are our frontend packages that are maintained with bower

* [AngularJS:](http://angularjs.org)
	* [UI Router:](https://github.com/angular-ui/ui-router)
	* [UI Bootstrap:](http://angular-ui.github.io/bootstrap)
	* [RESTangular:](https://github.com/mgonto/restangular)
* [SASS/Compass](http://sass-lang.com/)
* [Bootstrap:](http://getbootstrap.com/css/)
* [Fontello:](http://fontello.com/)
