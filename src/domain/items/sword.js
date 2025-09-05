var Class = $import('@core/class')
var ItemStrategy = $import('./item.strategy')

var Sword = Class.create({
  extends: ItemStrategy,
  constructor: function (damage) {
    this.damage = damage

    ItemStrategy.call(this, 'Sword')
  },
  methods: {
    execute: function (playerVM) {
      // playerVM.attack(this.damage)
      console.log('Attacked with sword for', this.damage)
    },
  },
})

module.exports = Sword
