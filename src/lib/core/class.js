var ClassFactory = {
  create: function (definition) {
    definition = definition || {};

    var constructor = definition.constructor || function () { };


    var parentClass = definition.extends;
    if (parentClass) {
      constructor.prototype = Object.create(parentClass.prototype);
      constructor.prototype.constructor = constructor;
      constructor.__super__ = parentClass.prototype;
    }


    if (definition.methods) {
      for (var methodName in definition.methods) {
        if (definition.methods.hasOwnProperty(methodName) &&
          typeof definition.methods[methodName] === 'function') {
          constructor.prototype[methodName] = definition.methods[methodName];
        }
      }
    }


    if (definition.static) {
      for (var staticName in definition.static) {
        if (definition.static.hasOwnProperty(staticName) &&
          typeof definition.static[staticName] === 'function') {
          constructor[staticName] = definition.static[staticName].bind(constructor);
        }
      }
    }

    return constructor;
  }
};

module.exports = ClassFactory;
