var ClassFactory = {
  create: function (definition) {
    var constructor = definition.constructor || function () { };
    var superClass = definition.extends;

    if (superClass) {
      constructor.prototype = Object.create(superClass.prototype);
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