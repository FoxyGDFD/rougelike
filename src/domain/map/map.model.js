var Class = $import('@core/class')
var TILE_TYPES = $import('./tile.types')

var MapModel = Class.create({
  constructor: function (config) {
    this.config = config.getConfig();
    this.map = [];

    this._fillEmptyMap();
  },

  methods: {
    generateMap: function () {
      for (var y = 0; y < this.map.length; y++) {
        for (var x = 0; x < this.map[y].length; x++) {
          if (
            x === 0 ||
            y === 0 ||
            x === this.map[y].length - 1 ||
            y === this.map.length - 1
          ) {
            this.map[y][x] = 1
          } else {
            var seed = Math.random();
            var type = TILE_TYPES['floor']
            if (seed > 0.8) { type = TILE_TYPES['wall'] }
            else if (seed < 0.01) { type = TILE_TYPES['heal'] }
            else if (seed < 0.02) { type = TILE_TYPES['sword'] }

            this.map[y][x] = type;
          }
        }
      }
      return this
    },

    _fillEmptyMap: function () {
      this.map = []
      for (var y = 0; y < this.config.mapHeight; y++) {
        var row = []
        for (var x = 0; x < this.config.mapWidth; x++) {
          row.push(0)
        }
        this.map.push(row)
      }
    }

  },
})

MapModel.createNew = function (config) {
  return new MapModel(config);
}

module.exports = MapModel