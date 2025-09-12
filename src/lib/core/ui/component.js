/** @typedef {import('@core/class').ClassConstructor} ClassConstructor */
var Class = $import('@core/class')
var effect = $import('@core/signal').effect

var templateCache = {}

/** @type {ClassConstructor} */
var Component = Class({
  constructor: function (templateUrl) {
    this._templateUrl = templateUrl
    this.element = null
  },

  methods: {

    onInit: function () { },
    onDestroy: function () { },

    destroy: function () {
      this.onDestroy()
    },

    _loadTemplate: function (callback) {
      if (templateCache[this._templateUrl]) {
        callback(this.templateCache[this._templateUrl])
        return
      }

      templateCache[this._templateUrl] = $import(this._templateUrl)
      callback(templateCache[this._templateUrl])
    },

    _parseTemplate: function (templateString) {
      var tempDiv = document.createElement('div')
      tempDiv.innerHTML = templateString.trim()

      return tempDiv.firstChild
    },

    render: function () {
      var self = this

      this._loadTemplate(function (templateString) {
        self.element = self._parseTemplate(templateString)

        self.onInit()
      })

      return this.element
    }

  }
})

module.exports = Component