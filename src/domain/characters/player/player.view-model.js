var Class = $import('@core/class')
var PlayerModel = $import('./player.model')
var computed = $import('@core/signal').computed

var PlayerViewModel = Class.create({
  constructor: function () {
    this.__model__ = PlayerModel.createNew()
    this.x = computed(
      function () {
        return this.__model__.x.value
      }.bind(this)
    )
    this.y = computed(
      function () {
        return this.__model__.y.value
      }.bind(this)
    )
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
      this.__model__.move(dx, dy)
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
PlayerViewModel.createNew = function () {
  return new PlayerViewModel()
}

module.exports = PlayerViewModel
