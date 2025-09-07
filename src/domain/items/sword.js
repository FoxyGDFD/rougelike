var Class = $import('@core/class')
var ItemStrategy = $import('./item.strategy')
var TILE_TYPES = $import('@domain/map/tile.types')

var Sword = Class.create({
  extends: ItemStrategy,
  constructor: function (damage) {
    this.damage = damage

    Sword.__super__.constructor.call(this, TILE_TYPES.sword, true)
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    execute: function (playerVM) {
      // playerVM.attack(this.damage)
      console.log('Attacked with sword for', this.damage)
    },
    createTile: function () {
      var tile = document.createElement('div')

      tile.className = 'tile tileSW'
      return tile
    },
  },
})

module.exports = Sword
