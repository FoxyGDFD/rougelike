var Class = $import('@core/class');

var Unit = Class.create({
  constructor: function (stats) {
    this.x = stats.x;
    this.y = stats.y;
    this.health = stats.health || 100;
    this.maxHealth = stats.health || 100;
  },
  methods: {
    move: function (dx, dy) {
      this.x += dx;
      this.y += dy;
      return { x: this.x, y: this.y };
    },
    takeDamage: function (amount) {
      this.health = Math.max(0, this.health - amount);
      return {
        currentHealth: this.health,
        isDead: this.health <= 0
      };
    }
  }
})

module.exports = Unit;