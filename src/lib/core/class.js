var ClassFactory = {
  create: function (definition) {
    var constructor = definition.constructor || function () { };
    var parentClass = definition.extends;

    if (parentClass) {
      constructor.prototype = Object.create(parentClass.prototype);
      constructor.prototype.constructor = constructor;
    }

    if (definition.methods) {
      for (var methodName in definition.methods) {
        if (definition.methods.hasOwnProperty(methodName)) {
          constructor.prototype[methodName] = definition.methods[methodName];
        }
      }
    }

    if (definition.static) {
      for (var staticMethod in definition.static) {
        if (definition.static.hasOwnProperty(staticMethod)) {
          constructor[staticMethod] = definition.static[staticMethod];
        }
      }
    }

    return constructor;
  }
};

module.exports = ClassFactory;