(function ($) {
    'use strict';
    var nsPattern, callMethod, control, i18n, nsWriter;

    nsPattern = /(?:[^\w]*)(\w+)(?:[^\w]*)/g;

    // i18n std object
    i18n = {
        // List of langs by preference order
        langs: [],
        // List of translations by lang > name
        regionals: {},
        setLangs: function () {
            this.langs = this.langs.concat(Array.prototype.slice.call(arguments));
        }
    };

    // Calls public method if defined
    callMethod = function (instance, method, args) {
        var callback;

        callback = instance.methods[method];

        if (typeof callback === 'function') {
            // Method is returning something, break the chain.
            return callback.apply(instance, args);
        }
    };

    // Returns plugin instance and/or call plugin method
    control = function (ns, nodes, options, args) {
        var Plugin, output;

        Plugin = $[ns];
        output = nodes;

        nodes.each(function () {
            var instance, returnValue;

            // Instanciation
            instance = $(this).data('easyPlug-' + ns) || new Plugin(this, options);

            // Method calling
            returnValue = callMethod(instance, options, args);

            if (returnValue !== undefined) {
                output = returnValue;
            }
        });
        return output;
    };

    // Returns a function that adds a namespace
    nsWriter = function (ns) {
        var localCallback, spaceCallback;
        localCallback = function (source, str, pos) {
            return (!pos ? '' : ' ') + ns + '-' + str;
        };
        spaceCallback = function (source, str, pos) {
            return (!pos ? '' : ' ') + str + '.' + ns;
        };
        return function (type, str) {
            return str.replace(nsPattern, type === 'local' ? localCallback : spaceCallback);
        };
    };

    // Creates the jQuery plugin
    $.easyPlug = function (init, conf) {
        var ns, addNS, Plugin, getInstance, eventKey, regionalKey;

        ns = conf.name || 'easyPlug' + new Date().getTime();
        addNS = nsWriter(ns);

        // Plugin constructor
        Plugin = function (node, options) {
            var element, settings;
            element = $(node);
            settings = $.extend({}, conf.presets, options);

            // Public methods
            this.methods = {
                settings: function () {
                    return $.extend({}, settings);
                }
            };

            // i18n
            if (Plugin.i18n) {
                this.i18n = $.extend({}, Plugin.i18n);
                // Share regionals between all instances
                this.i18n.regionals = Plugin.i18n.regionals;
                this.i18n.setLang(Plugin.i18n.lang);
            }

            // Save plugin instance
            element.data('easyPlug-' + ns, this);
            init.call(this, Plugin, element, settings, options);
        };

        // Prefixes any event with plugin name
        Plugin.local = function (global) {
            return addNS('local', global);
        };

        // Adds namespace to any event
        Plugin.space = function (global) {
            return addNS('space', global);
        };

        // Returns the plugin name
        Plugin.getName = function () {
            return ns;
        };

        // Returns a new instance of Plugin and/or call plugin method
        getInstance = function (options) {
            return control(ns, this, options, Array.prototype.slice.call(arguments, 1));
        };

        // Create the list of events
        if (conf.events) {
            Plugin.events = {};

            // name: pluginName-name
            for (eventKey in conf.events) {
                if (conf.events.hasOwnProperty(eventKey)) {
                    Plugin.events[conf.events[eventKey]] = Plugin.local(conf.events[eventKey]);
                }
            }
        }

        conf.presets = $.extend({}, conf.presets);

        // Events list
        if (conf.i18n) {
            Plugin.i18n = $.extend({}, i18n, conf.i18n);
            if (!Plugin.i18n.lang) {
                for (regionalKey in Plugin.i18n.regionals) {
                    if (Plugin.i18n.regionals.hasOwnProperty(regionalKey)) {
                        Plugin.i18n.lang = regionalKey;
                        break;
                    }
                }
            }
        }

        // Add to jQuery
        $[ns] = Plugin;
        $.fn[ns] = getInstance;

        return Plugin;
    };

}(jQuery));
