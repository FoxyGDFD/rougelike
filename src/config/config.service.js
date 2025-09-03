var Class = $import('@core/class')

var ConfigService = Class.create({
  constructor: function () {
    this._config = {
      // map with and height counts in tiles
      mapWidth: 40,
      mapHeight: 28,
      tileSize: 35
    }
  },
  methods: {
    getConfig: function () {
      return this._config
    }
  }
})


module.exports = ConfigService