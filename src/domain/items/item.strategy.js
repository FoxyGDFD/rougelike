var Class = $import('@core/class')

var ItemStrategy = Class.create({
  constructor: function (name, isDisposable) {
    this.name = name || 'ItemStrategy'
    this.isDisposable = isDisposable || false
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    execute: function (playerVM) {
      console.log('Using item:', this.name)
    },
  },
})

module.exports = ItemStrategy
