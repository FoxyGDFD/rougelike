var Class = $import('@core/class')
var signal = $import('@core/signal').signal

var Unit = Class.create({
  constructor: function (stats) {
    this.maxHealth = stats?.maxHealth || 100
    this.health = signal(stats?.health || this.maxHealth)
  },
  methods: {
    setHealth: function (hp) {
      this.health.value = hp
    },
  },
})

module.exports = Unit
