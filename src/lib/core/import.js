'use strict';

var moduleCache = {};


function joinPath() {
  var parts = [];
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      var part = arguments[i].replace(/^\/+|\/+$/g, '');

      if (part.includes('//')) {
        throw new Error(`Invalid path part: "${arguments[i]}" contains double slashes "//"`);
      }

      if (part) parts.push(part);
    }
  }
  return '/' + parts.join('/');
};


function resolvePath(basePath, relativePath) {
  var base = basePath.replace(/\/$/, '');
  var stack = base.split('/').filter(Boolean);

  var parts = relativePath.split('/').filter(part => part !== '');

  for (var i = 0; i < parts.length; i++) {
    if (parts[i] === '.') continue;
    if (parts[i] === '..') {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(parts[i]);
    }
  }

  return '/' + stack.join('/');
}


function loadModule(fullPath, requestPath) {
  if (moduleCache[fullPath]) {
    return moduleCache[fullPath];
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', fullPath, false);
  xhr.send();

  if (xhr.status !== 200) {
    throw new Error('Module not found: ' + fullPath);
  }

  var moduleExports = {};
  var module = { exports: moduleExports };
  var moduleDir = fullPath.substring(0, fullPath.lastIndexOf('/'));

  // локальная версия $import для этого модуля
  function localImport(path) {
    return $import(path, moduleDir);
  }

  try {
    var code =
      '(function(module, exports, __dirname, $import){' +
      xhr.responseText +
      '\n})(module, module.exports, "' + moduleDir + '", localImport);';
    eval(code);
  } catch (error) {
    throw new Error('Error in module ' + requestPath + ': ' + error.message);
  }

  moduleCache[fullPath] = module.exports;
  return module.exports;
}


function $import(requestPath, parentDir) {
  var fullPath;

  // относительный импорт
  if (requestPath.startsWith('./') || requestPath.startsWith('../')) {
    if (!parentDir) {
      throw new Error('Relative import "' + requestPath + '" used without parent context');
    }
    fullPath = resolvePath(parentDir, requestPath);
  } else {
    // импорт через алиас
    if (!window.ALIASES) {
      throw new Error('Aliases not loaded. Make sure aliases.js is loaded first');
    }
    var parts = requestPath.split('/');
    var alias = parts[0];
    var modulePath = parts.slice(1).join('/');

    if (!window.ALIASES[alias]) {
      throw new Error('Alias not found: ' + alias + '. Available: ' + Object.keys(window.ALIASES).join(', '));
    }

    fullPath = window.joinPath(window.ALIASES[alias], modulePath);
  }

  // добавляем .js, если расширение отсутствует
  if (!/\.js$/i.test(fullPath)) {
    fullPath += '.js';
  }

  console.log(fullPath, requestPath)
  return loadModule(fullPath, requestPath);
}

// --- Алиасы ---
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
