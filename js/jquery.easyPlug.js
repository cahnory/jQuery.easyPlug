'use strict';
// jQuery Plugin Boilerplate
// A boilerplate for jumpstarting jQuery plugins development
// by François Germain
(function($) {

  // Create the jQuery plugin
  $.easyPlug = function(init, conf) {
    var
    i,
    constructors = [],
    name = conf.name,
    
    // Plugin constructor
    Plugin = function( node, options ) {
      var
      element = $(node),
      settings = $.extend( {}, conf.presets, options );
      
      // Public methods
      this.methods = {
        settings: function() {
          return $.extend( {}, settings );
        }
      };
      
      // i18n
      if(Plugin.i18n) {
        this.i18n = $.extend({}, Plugin.i18n);
        // Share regionals between all instances
        this.i18n.regionals = Plugin.i18n.regionals;
        this.i18n.setLang(Plugin.i18n.lang);
      }

      // Save plugin instance
      element.data( 'easyPlug-' + name, this );
      init.call( this, Plugin, element, settings, options );
    },
    
    // Make a new instance of Plugin and/or call plugin method
    getInstance = function( options ) {
      return control(name, this, options, arguments);
    };
    
    // Return the plugin name
    Plugin.name = function( global ) {
      return name;
    };
    
    // Prefix any event with plugin name
    Plugin.local = function( global ) {
      return name + '-' + global;
    };
    
    // Add namespace to any event
    Plugin.space = function( global ) {
      return global + '.easyPlug-' + name;
    };
    
    // Autonaming
    if(!name) {
      name = 'easyPlug' + (new Date().getTime());
      console.log(name);
    }
    
    // Create the list of events
    if(conf.events) {
      Plugin.events = {};
      
      // name: pluginName-name
      for(i in conf.events) {
        Plugin.events[conf.events[i]] = Plugin.local(conf.events[i]);
      }
    }
    
    conf.presets = $.extend({}, conf.presets);
    
    // Events list
    if(conf.i18n) {
      Plugin.i18n = $.extend({}, i18n, conf.i18n);
      if(!Plugin.i18n.lang) {
        for(i in Plugin.i18n.regionals) {
          Plugin.i18n.lang = i;
          break;
        }
      }
    }
    
    // Add to jQuery
    $[ name ] = Plugin;
    $.fn[ name ] = getInstance;
    
    return Plugin;
  };
  
  var
  
  // i18n std object
  i18n = {
    // List of langs by preference order
    langs: [],
    
    // List of translations by lang > name
    regionals: {},
    
    getText: function( name, langs, placeholder ) {
      var i;
      
      // Get array of langs
      if(!langs) {
        langs = this.langs;
      } else if(typeof langs !== 'object') {
        langs = [langs];
      }
      
      for( i in langs ) {
        if( langs[i] in this.regionals && name in this.regionals[langs[i]] ) {
          return this.regionals[langs[i]][name];
        }
      }
      
      return placeholder;
    },
    setLang: function(langs) {
      // Get array of langs
      if(typeof langs !== 'object') {
        if(arguments.length > 1) {
          langs = arguments;
        } else {
          langs = [langs];
        }
      } else {
        langs = $.extend( {}, langs );
      }
      
      this.langs = langs;
    }
  },
  
  // Return plugin instance and/or call plugin method
  control = function( name, nodes, options, args ) {
    var
    plugin = $[ name ],
    output = nodes,
    r;
    nodes.each(function() {
      var instance;
      
      // Instanciation
      if ( undefined == ( instance = $( this ).data( 'easyPlug-' + name ))) {
        instance = new plugin( this, options );
      }
      
      // Method calling
      if(undefined !== ( r = callMethod( instance, options, Array.prototype.slice.call( args, 1 )))) {
        output = r;
      }
    });
    return output;
  },
  
  // Call public method if defined
  callMethod = function( instance, method, args ) {
    if ( method in instance.methods ) {
      // Method is returning something, break the chain.
      return instance.methods[ method ].apply( instance, args );
    }
  };

})(jQuery);