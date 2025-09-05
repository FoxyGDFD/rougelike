'use strict'

function bootstrap() {
  var ConfigService = $import('@config/config.service')
  var configService = new ConfigService()

  var MapModel = $import('@domain/map/map.model')
  var MapView = $import('@domain/map/map.view')

  var PlayerModel = $import('@domain/characters/player/player.model')
  var PlayerVM = $import('@domain/characters/player/player.view-model')
  var PlayerController = $import('@domain/characters/player/player.controller')
  var PlayerView = $import('@domain/characters/player/player.view')

  var mapSelector = document.querySelector('.field')
  var playerSelector = document.getElementById('player-container')

  var mapModel = MapModel.createNew(configService).generateMap()
  MapView.createNew(mapSelector, mapModel, configService).renderMap()
  console.log(mapModel.map)

  var playerVM = PlayerVM.createNew(PlayerModel.createNew(mapModel))
  PlayerView(playerSelector, playerVM, configService)
  new PlayerController(playerVM)

  // TODO: remove
  var damageBtn = playerSelector.querySelector('.damage-btn')
  var healBtn = playerSelector.querySelector('.heal-btn')
  var goldBtn = playerSelector.querySelector('.gold-btn')

  if (damageBtn)
    damageBtn.addEventListener('click', function () {
      playerVM.decreaseHealth(10)
    })
  if (healBtn)
    healBtn.addEventListener('click', function () {
      playerVM.increaseHealth(5)
    })
  if (goldBtn)
    goldBtn.addEventListener('click', function () {
      playerVM.addGold(50)
    })
}

bootstrap()
