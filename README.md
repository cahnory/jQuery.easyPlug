# Usage

EasyPlug is (until now) a single function attached to the jQuery object.

It allows you to define a jQuery plugin with a single manifest object like this :

```
// Return your plugin class
$.easyPlug({
  // Name of your plugin
  name: 'pluginName',

  // List of custom events (without prefix)
  events: ['ready'],

  // Presets for your plugin, extended with usage ones
  presets:  {
    foo: 'bar'
  },

  // Function called at each instantiation
  construct: function () {},

  // Function called just before the first instantiation
  init: function () {},

  // Function called when no public method is found
  invoke: function (name, args) {},

  // Prototype for you object
  prototype: {}
});
```

Note that none of these values is required.

---

The documentation for this version is in progress.