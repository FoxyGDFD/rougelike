var Class = $import('@core/class')

var ItemStrategy = Class.create({
  constructor: function (name, isDisposable) {
    this.name = name || 'ItemStrategy'
    this.isDisposable = isDisposable || false
    this.tile = null
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    execute: function (playerVM) {
      // eslint-disable-next-line no-console
      console.log('Using item:', this.name)
    },
    createTile: function () {},
  },
})

module.exports = ItemStrategy
