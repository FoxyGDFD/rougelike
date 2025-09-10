/**
 * Фабрика для создания классов с поддержкой наследования, миксинов и инъекций методов
 * @namespace
 */
var Class = function () {
  /**
   * Фабрика для создания классов
   */
  function create(definition) {
    var constructor = definition.constructor || function () { }
    var staticMethods = definition.static || {}
    var instanceMethods = definition.methods || {}
    var properties = definition.properties || {}
    var staticProperties = definition.staticProperties || {}

    constructor.extends = function (childDefinition) {
      return _extends.call(this, childDefinition)
    }

    constructor.inject = function (methods) {
      return _inject.call(this, methods)
    }

    _applyStaticProperties(staticProperties, constructor)
    _applyProperties(properties, constructor)
    _applyStaticMethods(staticMethods, constructor)
    _applyInstanceMethods(instanceMethods, constructor)

    return constructor
  }

  /**
   * Расширяет текущий класс, создавая дочерний класс
   * @param {Object} childDefinition - Определение дочернего класса
   * @returns {Function} Дочерний конструктор класса
   * @private
   */
  function _extends(childDefinition) {
    var parentConstructor = this
    var childStaticMethods = childDefinition.static || {}
    var childInstanceMethods = childDefinition.methods || {}
    var childProperties = childDefinition.properties || {}
    var childStaticProperties = childDefinition.staticProperties || {}
    var childConstructor =
      childDefinition.constructor ||
      function () {
        parentConstructor.apply(this, arguments)
      }

    _inherit(childConstructor, parentConstructor)

    _inheritStatic(childConstructor, parentConstructor)

    _applyStaticProperties(childStaticProperties, childConstructor)
    _applyProperties(childProperties, childConstructor)
    _applyStaticMethods(childStaticMethods, childConstructor)
    _applyInstanceMethods(childInstanceMethods, childConstructor)

    childConstructor.extend = function (grandChildDefinition) {
      return _extends.call(this, grandChildDefinition)
    }

    childConstructor.inject = function (methods) {
      return _inject.call(this, methods)
    }

    childConstructor.__super__ = parentConstructor.prototype

    return childConstructor
  }

  /**
   * Внедряет методы в прототип класса
   * @param {Object} methods - Объект с методами для внедрения
   * @returns {Function} Текущий конструктор класса
   * @private
   */
  function _inject(methods) {
    _applyInstanceMethods(methods, this)
    return this
  }

  /**
   * Применяет свойства с геттерами/сеттерами к прототипу класса
   * @param {Object} properties - Объект с определениями свойств
   * @param {Function} constructor - Конструктор класса
   * @private
   */
  function _applyProperties(properties, constructor) {
    Object.keys(properties).forEach(function (propName) {
      var propDefinition = properties[propName]
      Object.defineProperty(constructor.prototype, propName, {
        get: propDefinition.get,
        set: propDefinition.set,
        enumerable: propDefinition.enumerable !== false,
        configurable: propDefinition.configurable !== false,
      })
    })
  }

  /**
   * Применяет статические свойства с геттерами/сеттерами к конструктору класса
   * @param {Object} properties - Объект с определениями свойств
   * @param {Function} constructor - Конструктор класса
   * @private
   */
  function _applyStaticProperties(properties, constructor) {
    Object.keys(properties).forEach(function (propName) {
      var propDefinition = properties[propName]
      Object.defineProperty(constructor, propName, {
        get: propDefinition.get,
        set: propDefinition.set,
        enumerable: propDefinition.enumerable !== false,
        configurable: propDefinition.configurable !== false,
      })
    })
  }

  /**
   * Применяет методы экземпляра к прототипу класса
   * @param {Object} methods - Объект с методами
   * @param {Function} constructor - Конструктор класса
   * @private
   */
  function _applyInstanceMethods(methods, constructor) {
    Object.keys(methods).forEach(function (methodName) {
      constructor.prototype[methodName] = methods[methodName]
    })
  }

  /**
   * Применяет статические методы к конструктору класса
   * @param {Object} methods - Объект со статическими методами
   * @param {Function} constructor - Конструктор класса
   * @private
   */
  function _applyStaticMethods(methods, constructor) {
    Object.keys(methods).forEach(function (methodName) {
      constructor[methodName] = methods[methodName]
    })
  }

  /**
   * Наследует прототип дочернего класса от родительского
   * @param {Function} childClass - Дочерний конструктор
   * @param {Function} parentClass - Родительский конструктор
   * @private
   */
  function _inherit(childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype)
    childClass.prototype.constructor = childClass
  }

  /**
   * Наследует статические свойства и методы
   * @param {Function} childClass - Дочерний конструктор
   * @param {Function} parentClass - Родительский конструктор
   * @private
   */
  function _inheritStatic(childClass, parentClass) {
    var notInheredProperties = [
      'length',
      'name',
      'prototype',
      'extends',
      'inject',
      '__super__',
    ]
    Object.getOwnPropertyNames(parentClass).forEach(function (propName) {
      if (!notInheredProperties.includes(propName)) {
        var descriptor = Object.getOwnPropertyDescriptor(parentClass, propName)
        Object.defineProperty(childClass, propName, descriptor)
      }
    })
  }

  /**
   * Внедряет методы в существующий конструктор класса
   * @static
   * @param {Function} constructor - Конструктор класса для расширения
   * @param {Object} methods - Методы для внедрения в прототип
   * @returns {Function} Расширенный конструктор
   * @example
   * Class.inject(MyClass, { newMethod: function() {} });
   */
  create.inject = function (constructor, methods) {
    return _inject.call(constructor, methods)
  }

  /**
   * Примешивает свойства и методы из source в target (кроме constructor и prototype)
   * @static
   * @param {Object} target - Целевой объект
   * @param {Object} source - Источник для примешивания
   * @returns {Object} Модифицированный целевой объект
   * @example
   * Class.mixin(targetObj, sourceObj);
   */
  create.mixin = function (target, source) {
    Object.keys(source).forEach(function (key) {
      if (key !== 'constructor' && key !== 'prototype') {
        target[key] = source[key]
      }
    })
    return target
  }

  return create
}

module.exports = Class()
