var ClassFactory = {
  create: function (definition) {
    definition = definition || {}

    var constructor = definition.constructor || function () { }

    var parentClass = definition.extends
    if (parentClass) {
      constructor.prototype = Object.create(parentClass.prototype)
      constructor.prototype.constructor = constructor
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
          Object.prototype.hasOwnProperty.call(definition.static, staticName) &&
          typeof definition.static[staticName] === 'function'
        ) {
          constructor[staticName] =
            definition.static[staticName].bind(constructor)
        }
      }
    }

    return constructor
  },
}

module.exports = ClassFactory
