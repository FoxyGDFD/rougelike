'use strict';

var moduleCache = {};

function $import(aliasPath) {
  if (moduleCache[aliasPath]) {
    return moduleCache[aliasPath];
  }

  if (!window.ALIASES) {
    throw new Error('Aliases not loaded. Make sure aliases.js is loaded first');
  }

  var parts = aliasPath.split('/');
  var alias = parts[0];
  var modulePath = parts.slice(1).join('/');

  if (!window.ALIASES[alias]) {
    throw new Error('Alias not found: ' + alias + '. Available: ' + Object.keys(window.ALIASES).join(', '));
  }

  var fullPath = window.joinPath(window.ALIASES[alias], modulePath + '.js');

  var xhr = new XMLHttpRequest();
  xhr.open('GET', fullPath, false);
  xhr.send();

  if (xhr.status !== 200) {
    throw new Error('Module not found: ' + fullPath);
  }

  var moduleExports = {};
  var module = { exports: moduleExports };

  try {
    var code = '(function(module, exports) {' + xhr.responseText + '\n})(module, module.exports);';
    eval(code);
  } catch (error) {
    throw new Error('Error in module ' + aliasPath + ': ' + error.message);
  }

  moduleCache[aliasPath] = module.exports;
  return module.exports;
}

$import.addAlias = function (alias, path) {
  if (!window.ALIASES) window.ALIASES = {};
  window.ALIASES[alias] = path;
};

$import.getAlias = function (alias) {
  return window.ALIASES ? window.ALIASES[alias] : undefined;
};

$import.getAllAliases = function () {
  return window.ALIASES ? Object.assign({}, window.ALIASES) : {};
};

window.$import = $import;