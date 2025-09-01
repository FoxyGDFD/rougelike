var Class = $import('@core/class')
var PlayerModel = $import('./player.model')
var computed = $import('@core/signal').computed
var signal = $import('@core/signal').signal
var isWalkable = $import('@lib/utils/is-walkable')

var PlayerViewModel = Class.create({
  constructor: function (stats) {
    this.__model__ = PlayerModel.createNew()
    this.x = signal(stats.x || 0)
    this.y = signal(stats.y || 0)
    this.health = computed(
      function () {
        return this.__model__.health.value
      }.bind(this)
    )
    this.gold = computed(
      function () {
        return this.__model__.gold.value
      }.bind(this)
    )
    this.inventory = computed(
      function () {
        return this.__model__.inventory.value.slice()
      }.bind(this)
    )
  },
  methods: {
    move: function (dx, dy) {
      this.x.value += dx
      this.y.value += dy
    },
    takeDamage: function (amount) {
      this.__model__.setHealth(this.health.value - amount)
    },
    heal: function (amount) {
      this.__model__.setHealth(this.health.value + amount)
    },
    addGold: function (amount) {
      this.__model__.setGold(this.gold.value + amount)
    },
    addItem: function (item) {
      this.__model__.addItem(item)
    },
  },
})
PlayerViewModel.createNew = function (map) {
  var x, y
  do {
    x = Math.floor(Math.random() * map[0].length)
    y = Math.floor(Math.random() * map.length)
  } while (!isWalkable(x, y, map))

  return new PlayerViewModel({ x: x, y: y })
}

module.exports = PlayerViewModel
