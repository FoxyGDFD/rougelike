var Class = $import('@core/class');
var { signal } = $import('@core/signal')

var Unit = Class.create({
  constructor: function (stats) {
    this.x = signal(stats?.x || 0);
    this.y = signal(stats?.y || 0);
    this.maxHealth = stats?.maxHealth || 100;
    this.health = signal(stats?.health || this.maxHealth);
  },
  methods: {
    move: function (dx, dy) {
      this.x.value += dx;
      this.y.value += dy;
    },
    setHealth: function (hp) {
      this.health.value = hp;
    },
  }
})

module.exports = Unit;