var currentEffect = null;

function signal(initialValue) {
  var value = initialValue;
  var __subscribers__ = [];

  var obj = {};

  Object.defineProperty(obj, 'value', {
    get: function () {
      if (currentEffect && __subscribers__.indexOf(currentEffect) === -1) {
        __subscribers__.push(currentEffect);
      }
      return value;
    },
    set: function (newValue) {
      value = newValue;
      for (var i = 0; i < __subscribers__.length; i++) {
        __subscribers__[i]();
      }
    }
  });

  obj.subscribe = function (fn) {
    if (typeof fn === 'function' && __subscribers__.indexOf(fn) === -1) {
      __subscribers__.push(fn);
    }
  };

  return obj;
}

function effect(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

function computed(fn) {
  var c = signal(fn());

  effect(function () {
    c.value = fn();
  });

  return c;
}

module.exports = { signal: signal, computed: computed, effect: effect }