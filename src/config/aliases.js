'use strict';

window.ALIASES = {
  '@domain': '/src/domain',
  '@lib': '/src/lib',
  '@config': '/src/config',
  '@core': '/src/lib/core'
};

window.joinPath = function () {
  var parts = [];
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      var part = arguments[i].replace(/^\/+|\/+$/g, '');
      if (part) parts.push(part);
    }
  }
  return '/' + parts.join('/');
};