var Unit = $import('@domain/characters/unit')
var Class = $import('@core/class');

var Player = Class.create({
  extends: Unit,
  constructor: function (x, y) {
    if (Unit && typeof Unit === 'function') {
      Unit.call(this, x, y);
    }
    this.isPlayer = true;
    this.inventory = [];
    this.gold = 0;
  },
  static: {
    createNew: function () {
      return new Player(0, 0);
    },
  }
})

module.exports = Player;