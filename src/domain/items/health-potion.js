var Class = $import('@core/class')
var ItemStrategy = $import('./item.strategy')

var HealthPotion = Class.create({
  extends: ItemStrategy,
  constructor: function (healAmount) {
    this.healAmount = healAmount

    ItemStrategy.call(this, 'HealthPotion')
  },
  methods: {
    execute: function (playerVM) {
      playerVM.increaseHealth(this.healAmount)
      console.log('Healed for', this.healAmount)
    },
  },
})

module.exports = HealthPotion
