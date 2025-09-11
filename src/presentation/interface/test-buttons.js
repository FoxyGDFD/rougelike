var computed = $import('@core/signal').computed
var Component = $import('@core/ui/component')

var TestCharacterButtonsView = Component.extends({
  constructor: function (playerInfoSelector, playerVM) {
    Component.call(this, '@ui/interface/player-info.html')
    this._vm = playerVM
    this.containerSelector = playerInfoSelector

    this.x = computed(() => this._vm.coordinates.value.x)
    this.y = computed(() => this._vm.coordinates.value.y)
    this.health = computed(() => this._vm.health.value)
    this.gold = computed(() => this._vm.gold.value)
  },

  methods: {
    onInit: function () {
      console.log('Player info component initialized')
    },

    decreaseHealth: function () {
      this._vm.decreaseHealth(10)
    },

    increaseHealth: function () {
      this._vm.increaseHealth(5)
    },

    addGold: function () {
      this._vm.addGold(50)
    },
  },
})

module.exports = TestCharacterButtonsView