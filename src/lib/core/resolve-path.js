/**
 * Объединяет части пути в единый путь
 * @param {...string} parts - части пути
 * @returns {string} объединенный путь
 */
function joinPath() {
  var parts = []
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      // Убираем ведущие и завершающие слеши
      var part = arguments[i].replace(/^\/+|\/+$/g, '')
      if (part) {
        parts.push(part)
      }
    }
  }
  return parts.join('/')
}

/**
 * Разрешает относительный путь относительно базового
 * @param {string} basePath - базовый путь (директория)
 * @param {string} relativePath - относительный путь
 * @returns {string} абсолютный путь
 */
function resolveRelativePath(basePath, relativePath) {
  if (!basePath) {
    throw new Error('Base path is required for relative resolution')
  }
  if (!relativePath) {
    throw new Error('Relative path cannot be empty')
  }

  var baseParts = basePath.split('/').filter(Boolean)
  var relativeParts = relativePath.split('/').filter(Boolean)

  for (var i = 0; i < relativeParts.length; i++) {
    var part = relativeParts[i]

    if (part === '.') {
      continue
    } else if (part === '..') {
      if (baseParts.length > 0) {
        baseParts.pop()
      }
    } else {
      baseParts.push(part)
    }
  }

  return baseParts.join('/')
}

/**
 * Разрешает алиас в абсолютный путь
 * @param {string} requestPath - путь с алиасом (например: 'components/Button')
 * @returns {string} абсолютный путь
 */
function resolveAlias(requestPath) {
  if (!requestPath) {
    throw new Error('Empty alias path')
  }

  if (!window.ALIASES) {
    throw new Error('Aliases not configured. Use $import.addAlias() first')
  }

  var parts = requestPath.split('/')
  var alias = parts[0]

  if (!alias) {
    throw new Error('Invalid alias path: ' + requestPath)
  }

  if (!window.ALIASES[alias]) {
    var message =
      'Alias not found: "' +
      alias +
      '". Available: ' +
      Object.keys(window.ALIASES).join(', ')
    throw new Error(message)
  }

  var modulePath = parts.slice(1).join('/')
  var aliasBase = window.ALIASES[alias]

  return joinPath(aliasBase, modulePath)
}

/**
 * Проверяет, есть ли у пути известное расширение файла
 * @param {string} path - путь для проверки
 * @returns {boolean} true если есть известное расширение
 */
function hasKnownExtension(path) {
  var filename = path.split('/').pop()
  var knownExtensions = [
    '.js',
    '.html',
    '.css',
    '.json',
    '.txt',
    '.xml',
    '.svg',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
  ]
  return knownExtensions.some(
    function (ext) {
      return filename.toLowerCase().endsWith(ext)
    }.bind(this)
  )
}

/**
 * Основная функция разрешения путей
 * @param {string} requestPath - запрашиваемый путь
 * @param {string} [parentDir] - директория родительского модуля
 * @returns {string} абсолютный путь к файлу
 */
function resolvePath(requestPath, parentDir) {
  if (!requestPath) {
    throw new Error('Import path cannot be empty')
  }

  var fullPath

  if (requestPath.startsWith('./') || requestPath.startsWith('../')) {
    if (!parentDir) {
      throw new Error('Relative import requires parent directory context')
    }
    fullPath = resolveRelativePath(parentDir, requestPath)
  } else if (requestPath.startsWith('/')) {
    fullPath = requestPath.substring(1)
  } else {
    fullPath = resolveAlias(requestPath)
  }

  // Если уже есть известное расширение - не добавляем .js
  if (hasKnownExtension(fullPath)) {
    return fullPath
  }

  // Если есть точка, но неизвестное расширение - добавляем .js
  if (fullPath.includes('.')) {
    return fullPath + '.js'
  }

  // Если нет расширения - добавляем .js
  return fullPath + '.js'
}

window.resolvePath = resolvePath
