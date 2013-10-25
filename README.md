# What is easyPlug?

EasyPlug simplify jQuery plugin authoring.

Plugin creation only requires a definition object described below. **All jQuery related stuff is done for you**.

While it's quicker to edit it pushes conventions over all *easyPlugged* plugins.

# How it works?

To create your plugin, all you have to do is passing to easyPlug a **definition object** like this one:

```
// Return your plugin class
Plugin = $.easyPlug({
  name:      'example',
  construct: function () {}
});
```

## Definition object

Definition object does not require any member.

### construct *<small>(function)</small>*

A function called each time the plugin is instanciate for an element.

### events *<small>(array)</small>*

A list of custom events. Each event name will be prefixed and added to the events member of the Plugin:

```
$.easyPlug({
  name:   'example'
  events: ['foo']
});

// 'easyPlug__example-foo'
$.example.events.foo;
```

### init *<small>(function)</small>*

A function called when instanciating the Plugin for the first time.

### invoke *<small>(function)</small>*

A function called when invoking inaccessible methods:

```
$.easyPlug({
  invoke: function (name, args) {}
});
```

### name *<small>(string)</small>*

The name of your plugin.

```
$.easyPlug({name: 'example'});

// Plugin class
$.example;

// Plugin instance
$('.some-elements').example();
```

### presets *<small>(object)</small>*

Properties used by the plugin. Each plugin instance get an object combining presets and options passed by the user on instanciation:

```
// $.extend({}, presets, options)
this.settings;
```

### prototype *<small>(object)</small>*

The prototype of your Plugin. Each method of the prototype could be called like thid:

```
$('.some-elements').example('methodName', arg1, arg2);
```


## Plugin methods

EasyPlug defines "static" methods to each Plugin it generates.

### addPrefix(stringToPrefix)

Add a prefix uniq to the Plugin to any word in the string. It's this function which prefixes custom events.

```
// 'easyPlug__example-foo easyPlug__example-bar'
$.example.addPrefix('foo bar');
```

### addNamespace(stringToNamespace[, local])

Add a namespace uniq to the Plugin to any word in the string. Use this when binding, setting/getting data,… in your plugin.

```
// 'foo.easyPlug__example bar.easyPlug__example'
$.example.addNamespace('foo bar');

// 'foo.easyPlug__example.myNS bar.easyPlug__example.myNS'
$.inlineput.addNamespace('foo bar', 'myNS');
```

### getName()

Return the name of the plugin.

```
// 'example'
$.example.getName();
```

## easyPlug methods

### isPluggedTo(element, plugin)

Tell if the element was plugged by a particular plugin:

```
// false
$.easyPlug.isPluggedTo($('#single-element'), 'example');

// Here, element could be in a larger collection
$('#single-element').example();

// true
$.easyPlug.isPluggedTo($('#single-element'), 'example');
```

### getInstance(element, plugin)

Return the plugin instance of an element if exists:

```
// undefined
$.easyPlug.getInstance($('#single-element'), 'example');

// Here, element could be in a larger collection
$('#single-element').example();

// Return the plugin instance
$.easyPlug.getInstance($('#single-element'), 'example');
```