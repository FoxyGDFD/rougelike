var ClassFactory = {
  create: function (definition) {
    definition = definition || {}

    var parentClass = definition.extends

    var constructor =
      definition.constructor ||
      function () {
        if (parentClass) {
          parentClass.apply(this, arguments) // вызываем конструктор родителя
        }
      }

    if (parentClass) {
      if (typeof parentClass !== 'function') {
        throw new TypeError('Parent class must be a function')
      }

      constructor.prototype = Object.create(parentClass.prototype)
      constructor.prototype.constructor = constructor

      for (var key in parentClass) {
        if (parentClass.hasOwnProperty(key)) {
          constructor[key] = parentClass[key]
        }
      }

      constructor.__super__ = parentClass.prototype
    }

    if (definition.methods) {
      for (var methodName in definition.methods) {
        if (
          Object.prototype.hasOwnProperty.call(
            definition.methods,
            methodName
          ) &&
          typeof definition.methods[methodName] === 'function'
        ) {
          constructor.prototype[methodName] = definition.methods[methodName]
        }
      }
    }

    if (definition.static) {
      for (var staticName in definition.static) {
        if (
          Object.prototype.hasOwnProperty.call(definition.static, staticName)
        ) {
          constructor[staticName] = definition.static[staticName]
        }
      }
    }

    return constructor
  },
}

module.exports = ClassFactory
