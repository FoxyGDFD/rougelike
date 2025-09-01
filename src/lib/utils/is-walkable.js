function isWalkable(x, y, map) {
  if (x < 0 || y < 0 || y >= map.length || x >= map[0].length) {
    return false
  }
  return map[y][x] === 0
}

module.exports = isWalkable
