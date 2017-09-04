require.config({
    paths: {
      jquery: 'libs/jquery-1.11.2.min',
      underscore: 'libs/underscore-1.4.3.min',
      backbone: 'libs/backbone-1.1.2.min',
      text: 'libs/text',
      env: 'libs/env'
    },
    shim: {
      // Libraries
      jquery: {
        exports: '$'
      },
      underscore: {
        exports: '_',
      },
      backbone: {
        exports: 'Backbone',
        deps: ['jquery', 'underscore']
      },

      /*
       * Our app requires Backbone
       * (which in turn requires underscore and jQuery)
       */
      app: {
        deps: ['backbone']
      }
    }
});

require(['app'], function (App) {
  var app = new App();
});
