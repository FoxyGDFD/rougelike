var Class = $import('@core/class')
var LinkedList = $import('@core/linked-list')
var signal = $import('@core/signal').signal

var UnitModel = $import('@domain/characters/unit.model')
var TILE_TYPES = $import('@domain/map/tile.types')

var HealthPotion = $import('@domain/items/health-potion')
var Sword = $import('@domain/items/sword')

var PlayerModel = Class.create({
  extends: UnitModel,
  constructor: function (stats, mapModel) {
    this._gold = signal(stats.gold || 0)
    this._inventory = signal(new LinkedList())

    UnitModel.call(this, stats, mapModel)
  },
  methods: {
    move: function (dx, dy) {
      UnitModel.prototype.move.call(this, dx, dy)

      var coords = this.getCoordinates()
      var newX = coords.x
      var newY = coords.y

      var tile = this._map[newX][newY]
      if (tile === TILE_TYPES.heal) {
        var potion = new HealthPotion(20)
        this.addItem(potion)
        this._map[newX][newY] = TILE_TYPES.floor
      } else if (tile === TILE_TYPES.sword) {
        var sword = new Sword(10)
        this.addItem(sword)
        this._map[newX][newY] = TILE_TYPES.floor
      }
    },
    getGold: function () {
      return this._gold.value
    },
    setGold: function (amount) {
      this._gold.value = Math.max(0, amount)
    },

    getInventory: function () {
      return this._inventory.value.toArray()
    },
    addItem: function (item) {
      console.log(item)
      this._inventory.value.add(item)
      this._inventory.value = this._inventory.value
    },

    getCurrentItem: function () {
      return this._inventory.value.current
    },
    useCurrentItem: function (vm) {
      var item = this._inventory.value.getCurrentItem()
      if (!item) return

      item.use(vm)

      if (this.getCurrentItem()) {
        this.getCurrentItem().execute()
        if (this.getCurrentItem().isDisposable) {
          this._inventory.value.removeCurrent()
        }
      }
    },
  },
})

module.exports = PlayerModel
