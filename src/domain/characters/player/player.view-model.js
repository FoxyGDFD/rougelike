var Class = $import('@core/class')
var computed = $import('@core/signal').computed

var PlayerViewModel = Class.create({
  constructor: function (playerModel) {
    this._model = playerModel

    var self = this
    this.gold = computed(function () {
      return self._model.getGold()
    })

    this.inventory = computed(function () {
      return self._model.getInventory()
    })

    this.health = computed(function () {
      return self._model.getHealth()
    })

    this.coordinates = computed(function () {
      return self._model.getCoordinates()
    })
  },
  methods: {
    move: function (dx, dy) {
      this._model.move(dx, dy)
    },
    increaseHealth: function (amount) {
      this._model.increaseHealth(amount)
    },
    decreaseHealth: function (amount) {
      this._model.decreaseHealth(amount)
    },
    addGold: function (amount) {
      this._model.setGold(this.gold.value + amount)
    },
    addItem: function (item) {
      this._model.addItem(item)
    },

    useItem: function () {
      this._model.useCurrentItem(this)
    },
    nextItem: function () {
      this._model.nextItem()
    },
    prevItem: function () {
      this._model.prevItem()
    },
  },
  static: {
    createNew: function (playerModel) {
      return new PlayerViewModel(playerModel)
    },
  },
})

module.exports = PlayerViewModel
