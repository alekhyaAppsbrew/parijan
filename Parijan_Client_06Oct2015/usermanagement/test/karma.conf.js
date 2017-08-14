module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'ParijanClientApp_16May2015/bower_components/angular/angular.js',
      'ParijanClientApp_16May2015/bower_components/angular-route/angular-route.js',
      'ParijanClientApp_16May2015/bower_components/angular-resource/angular-resource.js',
      'ParijanClientApp_16May2015/bower_components/angular-animate/angular-animate.js',
      'ParijanClientApp_16May2015/bower_components/angular-mocks/angular-mocks.js',
      'ParijanClientApp_16May2015/bower_components/ngstorage/ngStorage.js',
      'ParijanClientApp_16May2015/js/controllers.js',
      'ParijanClientApp_16May2015/js/services.js',
      'ParijanClientApp_16May2015/js/**/*.js',
      'ParijanClientApp_16May2015/js/app.js',
      'test/unit/**/*.js',
      'ParijanClientApp_16May2015/js/*.js',
      'ParijanClientApp_16May2015/bower_components/bootstrap/*.js',
      'ParijanClientApp_16May2015/bower_components/bootstrap/dist/bootstrap.js',
      'ParijanClientApp_16May2015/ratingsFiles/ui-bootstrap-tpls-0.12.1.js',
    ],
    
    //port :3004,

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

   singleRun: true,

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
