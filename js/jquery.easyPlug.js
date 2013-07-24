/**
 * easyPlug
 *
 * LICENSE
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author     François "cahnory" Germain <cahnory@gmail.com>
 * @license    http://www.opensource.org/licenses/mit-license.php
 */
/*jslint browser: true, todo: true, plusplus: true, indent: 2 */
/*global jQuery */
(function ($) {
  'use strict';

  var
    // Prefix for all easyPlug helped plugins
    ns  = 'easyPlug-',

    // !easyPlug : defines a new jQuery plugin
    // ===========================================================
    easyPlug = function (manifest) {
      var Plugin, name, awake, i;

      // Prepare manifest
      manifest = manifest || {};

      // !Create plugin object
      // =========================================================
      Plugin = function (element, settings) {
        // Reference plugin instance
        this.element = $(element).data('_' + ns + name, this);

        // Define settings
        this.settings = $.extend({}, Plugin.presets, settings);

        // Call init if first instance
        if (!awake && typeof manifest.init === 'function') {
          awake = true;
          manifest.init.call(Plugin);
        }

        // Call constructor
        if (typeof manifest.construct === 'function') {
          manifest.construct.call(this);
        }
      };

      // Name the plugin
      name = manifest.name || ns + (new Date().getTime());


      // !Plugin methods ("static")
      // ---------------------------------------------------------
      // TODO: try avoid regex

      // add prefix to one or many custom events, data,…
      Plugin.prefix = function (generic) {
        return generic.replace(/^[\s]+|[\s]+$/g, '').replace(/([\s])+|^/g, '$1' + ns + name + '-');
      };

      // Add namespace to one or many events (binding)
      Plugin.space = function (global, local) {
        return global.replace(/^[\s]+|[\s]+$/g, '').replace(/([\s])+|$/g, '.' + ns + name + (local && '.' + local || '') + '$1');
      };

      // Return the plugin name
      Plugin.getName = function () {
        return name;
      };

      // !Define attributes ("static")
      // ---------------------------------------------------------

      // Plugin presets
      Plugin.presets  = $.extend({}, manifest.presets);

      // Define plugin events
      if (manifest.events) {
        Plugin.events = {};
        for (i = 0; i < manifest.events.length; i++) {
          // eventName: 'easyPlug-pluginName-eventName'
          Plugin.events[manifest.events[i]] = Plugin.prefix(manifest.events[i]);
        }
      }

      // Extend prototype with manifest one
      $.extend(Plugin.prototype, manifest.prototype);


      // !Define in jQuery
      // ---------------------------------------------------------

      // Define plugin in jQuery ("static")
      $[name] = Plugin;

      // Define plugin controller
      $.fn[name]  = function (option) {
        var
          result,
          args    = Array.prototype.slice.call(arguments, 1);

        // Loop through element collection
        this.each(function () {
          var plugin, element = $(this);

          // Get instance
          plugin = element.data('_' + ns + name) || new Plugin(element, option);

          // Try to call only if no result
          // but keep looping for possible instantiations
          if (result === undefined) {
            // Call method if exists
            if (typeof plugin[option] === 'function') {
              result = plugin[option].apply(plugin, args);

            // Call invoke if exists and unknown method
            } else if (typeof manifest.invoke === 'function' && typeof option === 'string') {
              result = manifest.invoke.call(plugin, option, args);
            }
          }
        });

        // Break the chain if method returns
        if (result !== undefined) {
          return result;
        }

        // Keep the chain
        return this;
      };

      // Return the plugin for prototyping and conveniance
      return Plugin;
    };

  // Attach easyPlug to jQuery
  $.easyPlug = easyPlug;

}(jQuery));