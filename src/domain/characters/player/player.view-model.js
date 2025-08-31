var Class = $import('@core/class');
var PlayerModel = $import('./player.model');

var PlayerViewModel = Class.create({
  constructor: function () {
    this.__model__ = PlayerModel.createNew();

    this.x = this.__model__.x;
    this.y = this.__model__.y;
    this.health = this.__model__.health;
    this.gold = this.__model__.gold;
    this.inventory = this.__model__.inventory;
  },
  methods: {
    move: function (dx, dy) { this.__model__.move(dx, dy); },
    takeDamage: function (amount) { this.__model__.setHealth(this.health.value - amount); },
    heal: function (amount) { this.__model__.setHealth(this.health.value + amount); },
    addGold: function (amount) { this.__model__.setGold(this.gold.value + amount); },
    addItem: function (item) { this.__model__.addItem(item); }
  }
});
PlayerViewModel.createNew = function () {
  return new PlayerViewModel();
};

module.exports = PlayerViewModel;