var Class = $import('@core/class')
var ItemStrategy = $import('./item.strategy')
var TILE_TYPES = $import('@domain/map/tile.types')

var HealthPotion = Class.create({
  extends: ItemStrategy,
  constructor: function (stats) {
    this.healAmount = stats.healAmount
    HealthPotion.__super__.constructor.call(this, TILE_TYPES.heal, true)
  },
  methods: {
    execute: function (playerVM) {
      playerVM.increaseHealth(this.healAmount)
    },
    createTile: function () {
      var tile = ItemStrategy.prototype.createTile.call(this)
      tile.className = 'tile tileHP'
      return tile
    },
  },
})

module.exports = HealthPotion
