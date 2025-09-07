var Class = $import('@core/class')
var UnitModel = $import('@domain/characters/unit.model')
var TILE_TYPES = $import('@domain/map/tile.types')
var HealthPotion = $import('@domain/items/health-potion')
var Sword = $import('@domain/items/sword')
var signal = $import('@core/signal').signal

var PlayerModel = Class.create({
  extends: UnitModel,
  constructor: function (mapModel, stats) {
    stats = stats || {}
    this._gold = signal(stats.gold || 0)
    this._inventory = stats.inventoryModel

    UnitModel.call(this, stats, mapModel)
  },
  methods: {
    move: function (dx, dy) {
      UnitModel.prototype.move.call(this, dx, dy)

      var coordinates = this.getCoordinates()
      var newX = coordinates.x
      var newY = coordinates.y

      var tile = this._mapModel.getMap()[newY][newX]

      if (tile === TILE_TYPES.heal) {
        this._inventory.add(new HealthPotion(20))
        this._mapModel.setTile(newX, newY, TILE_TYPES.floor)
      } else if (tile === TILE_TYPES.sword) {
        this._inventory.add(new Sword(10))
        this._mapModel.setTile(newX, newY, TILE_TYPES.floor)
      }
    },

    getGold: function () {
      return this._gold.value
    },
    setGold: function (amount) {
      this._gold.value = Math.max(0, amount)
    },

    useCurrentItem: function (vm) {
      this._inventory.useCurrentItem(vm)
    },

    dropCurrentItem: function () {
      var item = this._inventory.getCurrentNode().item
      var coordinates = this.getCoordinates()
      var currentX = coordinates.x
      var currentY = coordinates.y
      if (this._mapModel.getMap()[currentY][currentX] !== TILE_TYPES.floor)
        return
      this._mapModel.setTile(currentX, currentY, item.name)
      this._inventory.removeCurrentNode()
      return item
    },
  },
})

module.exports = PlayerModel
