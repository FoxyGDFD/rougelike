var TILE_SIZE = 35

var field = document.querySelector('.field')

// Создание пустой карты
function createEmptyMap(width, height) {
  var map = []
  for (var y = 0; y < height; y++) {
    var row = []
    for (var x = 0; x < width; x++) {
      row.push(0) // 0 - пол
    }
    map.push(row)
  }
  return map
}

// Заполнение стен: границы + случайные внутренние
function generateWalls(map) {
  for (var y = 0; y < map.length; y++) {
    for (var x = 0; x < map[y].length; x++) {
      if (
        x === 0 ||
        y === 0 ||
        x === map[y].length - 1 ||
        y === map.length - 1
      ) {
        map[y][x] = 1 // стена
      } else {
        map[y][x] = Math.random() < 0.2 ? 1 : 0 // случайная стена
      }
    }
  }
  return map
}

// Создание одного тайла
function createTile(x, y, type) {
  var tile = document.createElement('div')
  tile.className = 'tile'
  if (type === 1) {
    tile.className += ' tileW' // стена
  }

  tile.style.left = x * TILE_SIZE + 'px'
  tile.style.top = y * TILE_SIZE + 'px'

  return tile
}

// Рисуем карту на поле
function drawMap(map) {
  for (var y = 0; y < map.length; y++) {
    for (var x = 0; x < map[y].length; x++) {
      var tile = createTile(x, y, map[y][x])
      field.appendChild(tile)
    }
  }
}

module.exports = {
  createEmptyMap: createEmptyMap,
  generateWalls: generateWalls,
  drawMap: drawMap,
}
