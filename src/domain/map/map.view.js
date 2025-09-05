var TILE_TYPES = $import('./tile.types')

function MapView(container, mapModel, configService) {
  this.model = mapModel
  this.container = container
  this.config = configService.getConfig()
}

MapView.prototype.renderMap = function () {
  for (var y = 0; y < this.model.map.length; y++) {
    for (var x = 0; x < this.model.map[y].length; x++) {
      var tile = this._createTile(x, y, this.model.map[y][x])
      this.container.appendChild(tile)
    }
  }
}

MapView.prototype._createTile = function (x, y, type) {
  var tile = document.createElement('div')
  tile.className = 'tile'
  if (type === TILE_TYPES['wall']) {
    tile.className += ' tileW'
  }
  if (type === TILE_TYPES['sword']) {
    tile.className += ' tileSW'
  }
  if (type === TILE_TYPES['heal']) {
    tile.className += ' tileHP'
  }
  tile.style.left = x * this.config.tileSize + 'px'
  tile.style.top = y * this.config.tileSize + 'px'
  return tile
}

MapView.prototype.renderTile = function (x, y) {
  var tile = this._createTile(x, y, this.model.map[y][x])
  this.container.appendChild(tile)
  return tile
}

MapView.createNew = function (container, mapModel, configService) {
  return new MapView(container, mapModel, configService)
}

module.exports = MapView
