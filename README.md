# react-conditional

Render React elements conditionally, based on predicates specified on the current React class.

### Initializing

```js
require('react-conditional')(React)

React.showIf(...)
```

### Api

### .showIf(conditional)

Starts the "showIf" chain, accepting a `conditional` which may be either an array, string, or function. If it's an array,
the conditional passes if all elements in the array pass. If it's a string it's assumed to be a method on the current
object which returns a boolean. If it's a function, it's a 

### .and(conditional)

Same as .showIf, but it may be chained.

### .or(conditional)

Allows for adding an "or" conditional 

```js
render: React.showIf('someMethod').or('somethingElse')
```

### .rendering(methodName)

Allows for specifying the method name on the current element that should be rendered when the chain passes,
defaulting to "rendering".

### .fallback(methodName)

Allow for specifying a different fallback if the current 

### Examples

```js
var Element = React.createClass({

  someConditional: function() {
    return true;
  },

  render: React.showIf('someConditional'),

  rendering: function() {
    // ... React element here, as if it were render.
  }

});

var Element2 = React.createClass({

  someConditional: function() {
    return true;
  },

  render: React.showIf(someConditional).rendering('thisIsShown'),

  thisIsShown: function() {
    // ... React element here, as if it were render.
  }

});

var Element3 = React.createClass({

  someConditional: function() {
    return false;
  },
  someOtherConditional: function() {
    return false;
  },
  
  render: React.showIf('someConditional').or('someOtherConditional').fallback('fallbackFn'),

  fallbackFn: function() {
    // ... This is rendered if the chain does not pass
  }

});
```

### License

MIT