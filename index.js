// react-conditional
// (c) 2014 Tim Griesser
// MIT License
// --------------

module.exports = function(React) {

  // Pass any conditions that have already been determined
  // from previous chaining.
  function renderConditionally(conditions) {
    
    // Acts as both the chainable object and the dispatching
    // "render" method.
    function render() {
      var passing    = true;
      var rendering  = 'rendering';
      var fallback   = fallbackMethod;
      for (var i = 0, l = conditions.length; i < l; i++) {
        var condition = conditions[i];
        var current   = condition[0];
        if (current === 'rendering') {
          rendering = condition[1];
        } else if (current === 'fallback') {
          fallback = condition[1];
        } else if (current === 'and') {
          passing = passing && check(this, passing, condition[1]);
        } else {
          passing = passing || check(this, passing, condition[1], true);
        }
      }
      if (passing) return this[rendering]();
      return (typeof fallback === 'string' ? this[fallback]() : fallback());
    }

    render.and = function(predicate) {
      conditions.push(['and', predicate]);
      return renderConditionally(conditions);
    };

    render.or  = function(predicate) {
      conditions.push(['or', predicate]);
      return renderConditionally(conditions);
    };

    render.rendering = function(item) {
      conditions.push(['rendering', item]);
      return renderConditionally(conditions);
    };

    render.fallback = function(item) {
      conditions.push(['fallback', item]);
      return renderConditionally(conditions);
    };

    return render;
  }

  // Check the conditions to see whether an element 
  // should be rendered.
  function check(context, passing, checking, or) {

    if (!Array.isArray(checking)) {
      checking = [checking];
    }

    // Check each of the items in the "checking" array,
    // reducing them to a single value.
    return checking.reduce(function(memo, condition) {
      return memo && (function() {
        switch (typeof condition) {
          case 'string':   return context[condition]();
          case 'function': return condition.call(context);
        }
      }());
    }, true, context);
  }
  
  // Default fallback is an empty "div"
  function fallbackMethod() {
    return React.DOM.div(null);
  }
  function showIf(predicate) {
    return renderConditionally([]).and(predicate);
  }

  React.showIf = showIf;
  
  return React;
};