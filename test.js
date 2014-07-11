var React  = require('react');
var assert = require('assert');

require('./index')(React);

function truthy() {
  return true;
}
function falsy() {
  return false;
}
function rendering() {
  return React.DOM.h1(null, 'Hello World');
}

it('should conditionally show a react element', function() {

  var Element = React.createClass({
    one: truthy,
    render: React.showIf('one'),
    rendering: rendering
  });

  assert.equal(React.renderComponentToStaticMarkup(Element()), '<h1>Hello World</h1>');
});

it('allows multiple predicates to show a react element', function() {
  var Element = React.createClass({
    one: truthy,
    two: truthy,
    render: React.showIf('one').and('two'),
    rendering: rendering
  });
  assert.equal(React.renderComponentToStaticMarkup(Element()), '<h1>Hello World</h1>');

  var Element2 = React.createClass({
    one: truthy,
    two: truthy,
    render: React.showIf(['one', 'two']),
    rendering: rendering
  });
  assert.equal(React.renderComponentToStaticMarkup(Element2()), '<h1>Hello World</h1>');
});

it('allows chaining or', function() {
  var Element = React.createClass({
    one: falsy,
    two: falsy,
    render: React.showIf('one').or('two'),
    rendering: rendering
  });
  assert.equal(React.renderComponentToStaticMarkup(Element()), '<div></div>');
  var Element2 = React.createClass({
    one: falsy,
    two: truthy,
    render: React.showIf('one').or('two'),
    rendering: rendering
  });
  assert.equal(React.renderComponentToStaticMarkup(Element2()), '<h1>Hello World</h1>');
});

it('is possible to specify a different rendering target', function() {
  var Element = React.createClass({
    one: truthy,
    two: truthy,
    render: React.showIf('one').and('two').rendering('otherTarget'),
    otherTarget: rendering
  });
  assert.equal(React.renderComponentToStaticMarkup(Element()), '<h1>Hello World</h1>');
});

it('is possible to specify a different rendering fallback', function() {
  var Element = React.createClass({
    one: truthy,
    two: falsy,
    render: React.showIf('one').and('two').fallback('fallback'),
    fallback: function() {
      return React.DOM.div(null, 'Hello');
    }
  });
  assert.equal(React.renderComponentToStaticMarkup(Element()), '<div>Hello</div>');
});