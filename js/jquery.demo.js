'use strict';
(function($) {
  
  var
  conf = {
    name: 'demo',
    presets: {
      foo: 'bar'
    },
    events: ['ready'],
    i18n: {
      regionals: {
        fr: {
          foo: 'fr bar'
        },
        en: {
          foo: 'en bar'
        }
      }
    }
  },
  Plugin = $.easyPlug(function(plugin, element, cfg) {
    var
    // instance private vars
    foo = 'bar',
    history = [],
    
    // Private method
    foo = function() {
      console.log('private bar');
    };
    
    // Plublic method
    this.methods.foo = function() {
      console.log('public bar: ' + element.text());
    };
    
    element.trigger(Plugin.events.ready);
    
  }, conf);

})(jQuery);