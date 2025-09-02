var Class = $import('@core/class')
var PlayerModel = $import('./player.model')
var computed = $import('@core/signal').computed
var signal = $import('@core/signal').signal
var isWalkable = $import('@lib/utils/is-walkable')

var PlayerViewModel = Class.create({
  constructor: function (stats) {
    this.__model__ = PlayerModel.createNew()
    this.coordinates = signal(stats.coordinates || { x: 0, y: 0 })
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
    if (!stats.map) throw new Error("Map is not injected")
    this.map = stats.map;

  },
  methods: {
    move: function (dx, dy) {
      var newX = this.coordinates.value.x + dx;
      var newY = this.coordinates.value.y + dy;
      if (!isWalkable(newX, newY, this.map)) return;

      this.coordinates.value = { x: newX, y: newY }
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

  return new PlayerViewModel({ coordinates: { x: x, y: y }, map: map })
}

module.exports = PlayerViewModel
