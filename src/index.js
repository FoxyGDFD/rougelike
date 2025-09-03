'use strict'

function bootstrap() {
  var ConfigService = $import('@config/config.service');
  var configService = new ConfigService();

  var MapModel = $import('@domain/map/map.model')
  var MapView = $import('@domain/map/map.view')
  var PlayerVM = $import('@domain/characters/player/player.view-model')
  var PlayerView = $import('@domain/characters/player/player.view')

  var mapModel = MapModel.createNew(configService).generateMap()
  MapView.createNew(document.querySelector('.field'), mapModel, configService).renderMap()

  console.log(mapModel.map)

  var player = PlayerVM.createNew(mapModel, configService)
  PlayerView(document.getElementById('player-container'), player, configService)
}

bootstrap()
