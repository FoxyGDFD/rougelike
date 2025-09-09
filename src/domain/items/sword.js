var Class = $import('@core/class')
var ItemStrategy = $import('./item.strategy')
var TILE_TYPES = $import('@domain/map/tile.types')

var Sword = Class.create({
  extends: ItemStrategy,
  constructor: function (stats) {
    this.damage = stats.damage
    this.range = stats.range
    Sword.__super__.constructor.call(this, TILE_TYPES.sword)
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    execute: function (playerVM) {
      console.warn('This item is not executable')
    },
    createTile: function () {
      var tile = ItemStrategy.prototype.createTile.call(this)

      tile.className = 'tile tileSW'
      return tile
    },
  },
})

module.exports = Sword
