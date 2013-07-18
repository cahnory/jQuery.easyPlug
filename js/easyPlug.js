/*jslint browser: true, devel: true, windows: false, indent: 2 */
/*global jQuery */
(function ($) {
  'use strict';

  var 

  // Prefix for all easyPlug helped plugins
  ns  = 'easyPlug-',

  // Defines a new jQuery plugin
  easyPlug = function (manifest) {
    var Plugin, name, i;

    // Create plugin object
    // =========================================================
    Plugin = function (element, settings) {
      // Reference plugin instance
      this.element = $(element).data('_' + ns + name, this);

      // Define settings
      this.settings = $.extend({}, Plugin.presets, settings);
    };

    // Name the plugin
    name = manifest.name || (new Date().getTime());


    // Plugin methods ("static")
    // ---------------------------------------------------------

    // add prefix to one or many custom events, data,…
    Plugin.local = function (generic) {
      return generic.replace(/^[\s]+|[\s]+$/g, '').replace(/([\s])+|^/g, '$1' + name + '-');
    };

    // Add namespace to one or many events (binding)
    Plugin.space = function (global) {
      return global.replace(/^[\s]+|[\s]+$/g, '').replace(/([\s])+|$/g, '.easyPlug-' + name + '$1');
    };

    // Define attributes ("static")
    // ---------------------------------------------------------

    // Plugin presets
    Plugin.presets  = $.extend({}, manifest.presets);

    // Define plugin events
    if (manifest.events) {
      Plugin.events = {};
      for (i = 0; i < manifest.events.length; i++) {
        // eventName: 'easyPlug-pluginName-eventName'
        Plugin.events[manifest.events[i]] = Plugin.local(manifest.events[i]);
      }
    }

    // Prototype shortcut as for jQuery
    Plugin.fn = Plugin.prototype;

    // Define in jQuery
    $[name]     = Plugin;
    $.fn[name]  = function (options) {
      var i, plugin, element;

      // Loop through element collection
      for (i = 0; i < this.length; i++) {
        element = this.eq(i);
  
        // Get instance
        plugin = element.data('_' + ns + name) || new Plugin(element, arguments[0]);

        // Call method if exists
        if (typeof plugin[arguments[0]] === 'function') {
          result = plugin[arguments[0]].apply(plugin, Array.prototype.slice.call(arguments, 2));

          // Break the chain if method returns
          if (result !== undefined) {
            return result;
          }
        }
      }

      // Keep the chain
      return this;
    };
  };

  easyPlug.prototype = {
    prefixEvents: function (prefix, events) {
      //events
    }
  };

  $.easyPlug = easyPlug;

}(jQuery));