'use strict'

function bootstrap() {
  var PlayerVM = $import('@domain/characters/player/player.view-model')
  var PlayerView = $import('@domain/characters/player/player.view')
  var Map = $import('@domain/fields/generate-field')

  var MAP_WIDTH = 40
  var MAP_HEIGHT = 28

  var map = Map.createEmptyMap(MAP_WIDTH, MAP_HEIGHT)
  map = Map.generateWalls(map)
  Map.drawMap(map)

  console.log(map)

  var player = PlayerVM.createNew(map)
  PlayerView(document.getElementById('player-container'), player)
}

bootstrap()
