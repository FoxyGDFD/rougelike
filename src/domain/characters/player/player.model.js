var Class = $import('@core/class')
var Unit = $import('@domain/characters/unit.model')
var signal = $import('@core/signal').signal

var PlayerModel = Class.create({
  extends: Unit,
  constructor: function (stats) {
    PlayerModel.__super__.constructor.call(this)

    this.gold = signal(stats?.gold || 0)
    this.inventory = signal(stats?.inventory || [])
  },
  methods: {
    setHealth: function (amount) {
      if (amount > this.maxHealth) {
        this.health.value = this.maxHealth
      } else {
        this.health.value = amount
      }
    },
    setGold: function (amount) {
      this.gold.value = amount
    },
    addItem: function (item) {
      var arr = this.inventory.value.slice()
      arr.push(item)
      this.inventory.value = arr
    },
  },
})

PlayerModel.createNew = function () {
  return new PlayerModel(0, 0)
}

module.exports = PlayerModel
