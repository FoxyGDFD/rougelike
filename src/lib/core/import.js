'use strict'

var moduleCache = {}

/**
 * Загрузка HTML файла и преобразование в DOM элементы
 */
function loadHTMLModule(code, fullPath) {
  try {
    return code
  } catch (error) {
    throw new Error('HTML error in ' + fullPath + ': ' + error.message)
  }
}

/**
 * Загрузка JSON файла
 */
function loadJSONModule(code, fullPath) {
  try {
    return JSON.parse(code)
  } catch (error) {
    throw new Error('JSON parse error in ' + fullPath + ': ' + error.message)
  }
}

/**
 * Загрузка JavaScript модуля
 */
function loadJSModule(code, fullPath) {
  var moduleExports = {}
  var module = { exports: moduleExports }
  var moduleDir = fullPath.substring(0, fullPath.lastIndexOf('/'))

  function localImport(path) {
    return $import(path, moduleDir)
  }

  try {
    var moduleFunction = new Function(
      'module',
      'exports',
      '__dirname',
      '$import',
      '\n//# sourceURL=' + fullPath + '\n' + code
    )

    moduleFunction(module, module.exports, moduleDir, localImport)
    return module.exports
  } catch (error) {
    var errorMessage = 'Error in ' + fullPath + ': ' + error.message

    if (error.stack) {
      var stackLines = error.stack.split('\n')
      for (var i = 0; i < stackLines.length; i++) {
        if (stackLines[i].includes(fullPath)) {
          errorMessage += '\n at ' + stackLines[i].trim()
          break
        }
      }
    }

    throw new Error(errorMessage)
  }
}

/**
 * Синхронная загрузка файла
 * @param {string} filePath - абсолютный путь до файла
 */
function loadFileSync(filePath) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', filePath, false)
  xhr.send()

  if (xhr.status !== 200) {
    throw new Error(
      'File not found: ' + filePath + ' (status: ' + xhr.status + ')'
    )
  }

  return xhr.responseText
}

/**
 * Загрузка модуля по полному пути
 */
function loadModule(fullPath) {
  if (moduleCache[fullPath]) {
    return moduleCache[fullPath]
  }

  var extension = fullPath.split('.').pop().toLowerCase()
  var file = loadFileSync(fullPath)
  var result

  switch (extension) {
    case 'html':
      result = loadHTMLModule(file, fullPath)
      break

    case 'json':
      result = loadJSONModule(file, fullPath)
      break

    case 'js':
      result = loadJSModule(file, fullPath)
      break

    default:
      throw new Error('Unsupported file type: ' + extension)
  }

  moduleCache[fullPath] = result
  return result
}

/**
 * Основная функция импорта
 */
function $import(requestPath, parentDir) {
  if (!requestPath) {
    throw new Error('Import path cannot be empty')
  }

  var fullPath = window.resolvePath(requestPath, parentDir)
  return loadModule(fullPath)
}

window.$import = $import
