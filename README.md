# Usage

EasyPlug is (until now) a single function attached to the jQuery object.
It allows you to define a jQuery plugin easily.

Since 0.1.3:

```
$.easyPlug( settings );
```

The old syntaxe is still supported but deprecated:

```
$.easyPlug( constructor [, settings ] );
```
## Parameters

### settings

An object of settings providing informations to easyPlug in order to prepare the plugin.

Here is the list of properties:

+ **name**: the name of your plugin. If you don't provide a name, an unique one will be generated
+ **presets**: default settings objects. A copy of it, merged with user options, is provided on instantiation.
+ **events**: an array of event name. Event names will be prefixed by easyPlug (e.g. *ready* become *pluginName-ready*)
+ **construct**: A function called on instantiation.
+ **init**: A function called juste before the constructor of the first instantiation.

The single required property is *construct* unless the old syntaxe is used.

#### Construct & init

A plugin instance is created for each element in the set of matched elements.
After each plugin instanciation, the *construct* function is called.

*Construct* has four arguments :

+ **Plugin**: the Plugin object
+ **element**: jQuery object with a single element from the original set of elements
+ **settings**: Merged contents of plugin presets and user options
+ **options**: Original user options

The *init* function is executed on the first instanciation, just before the call of *construct*.

## Returns

### Plugin object

The Plugin object. You can, for example, add "static" properties and/or methods to it.

# How it helps ?

## Add to jQuery

EasyPlug attach the plugin controller to the jQuery *fn* property (prototype). The controller instantiate plugin if needed and/or call public method.  
The controller is called each time you call your plugin:

```
$( selection ).pluginName();
```

EasyPlug also attach the Plugin object directly on the jQuery object, acting as "static":

```
$.pluginName;
```

## Chainability

If no public method is called or, if the method returns undefined, the controller returns the set of matche elements.  
If a public method does not return undefined, the value is directly returned.

```
$( selection ).pluginName().attr( 'foo', 'bar' );
```

## Public methods

### Declaration

To declare your public method, you have to add it to the *methods* property in your constructor:

```
$.easyPlug(function() {
  this.methods.methodName = function( [ argument, … ] ) {
    // instructions
  };
});
```

### Calling

To call a public method, all you have to do is to pass its name as first argument:

```
$( selection ).pluginName( 'methodName' [, argument, … ] );
```

### Predefined methods

Until now there is a single predefined method.

+ **settings**(): returns a copy of the settings object


## Custom events

All custom events are automatically prefixed in order to avoid conflicts between public and standard events.

Custom events are defined in the *events* property of the Plugin objects.

```
$.pluginName.events.custom; // pluginName-custom
```

## "Static" public methods

###Declaration

To declare your static public method, you have to add it directly on the Plugin object:

```
$.pluginName.methodName = function( [ argument, … ] ) {
  // instructions
};
```

###Calling

Static public method are called like any javascript method:

```
$.pluginName.methodName( [ argument, … ] );
```

### Predefined methods

+ **getName**(): returns the plugin name
+ **local**( string ): returns a string prefixed with '*pluginName*-'
+ **space**( string ): returns a string suffixed with '.easyPlug-*pluginName*'
