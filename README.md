# react-conditional

Render React elements conditionally, based on a chain of predicates specified on the
current React class.

### Initializing

```js
require('react-conditional')(React)

React.showIf(...)
```

### Api:

#### .showIf(conditional)

Starts the "showIf" chain, accepting a `conditional` which may be either an array, string, or function. If it's an array,
the conditional passes if all elements in the array pass. If it's a string it's assumed to be a method on the current
object which returns a boolean. By default, the `rendering` method is called when the chain passes.

```js
var Demo = React.createClass({
  someMethod: function() { return true; },
  render: React.showIf('someMethod'),
  rendering: function() {
    return React.DOM.h1({}, 'Hello World');
  }
});
```

#### .and(conditional)

Same as .showIf, but it may be chained:

```js
var Demo = React.createClass({
  someMethod: function() { return true; },
  someOtherMethod: function() { return false; },
  render: React.showIf('someMethod').and('someOtherMethod'),
  rendering: function() {
    return React.DOM.h1({}, 'Hello World');
  }
});
```

#### .or(conditional)

Allows for adding an "or" conditional:

```js
var Demo = React.createClass({
  someMethod: function() { return true; },
  someOtherMethod: function() { return false; },
  render: React.showIf('someMethod').or('somethingElse'),
  rendering: function() {
    return React.DOM.h1({}, 'Hello World');
  }
});
```

#### .rendering(methodName)

Allows for specifying the method name on the current element that should be rendered when the chain passes,
defaulting to "rendering".

```js
var Demo = React.createClass({
  someMethod: function() { return true; },
  someOtherMethod: function() { return false; },
  render: React.showIf('someMethod').or('somethingElse').rendering('thisMethod'),
  thisMethod: function() {
    return React.DOM.h1({}, 'Hello World');
  }
});
```

#### .fallback(methodName)

Allow for specifying a different fallback if the current chain does not pass:

```js
var Demo = React.createClass({
  someMethod: function() { return true; },
  someOtherMethod: function() { return false; },
  render: React.showIf('someMethod').or('somethingElse').fallback('fallbackMethod'),
  rendering: function() {
    return React.DOM.div({}, 'Passed');
  },
  fallbackMethod: function() {
    return React.DOM.h1({}, 'Empty');
  }
});
```

### License

MIT