'use strict'

function bootstrap() {
  var ConfigService = $import('@config/config.service')
  var configService = new ConfigService()

  var MapModel = $import('@domain/map/map.model')
  var MapView = $import('@domain/map/map.view')

  var PlayerInventoryModel = $import(
    '@domain/characters/player/inventory/inventory.model'
  )
  var PlayerInventoryController = $import(
    '@domain/characters/player/inventory/inventory.controller'
  )
  var PlayerInventoryView = $import(
    '@domain/characters/player/inventory/inventory.view'
  )
  var PlayerModel = $import('@domain/characters/player/player.model')
  var PlayerVM = $import('@domain/characters/player/player.view-model')
  var PlayerController = $import('@domain/characters/player/player.controller')
  var PlayerView = $import('@domain/characters/player/player.view')

  var mapSelector = document.querySelector('.field')
  var playerSelector = document.getElementById('player-container')
  var inventorySelector = document.querySelector('.inventory')

  var mapModel = MapModel.createNew(configService).generateMap()
  MapView.createNew(mapSelector, mapModel, configService).renderMap()
  // eslint-disable-next-line no-console
  console.log(mapModel.getMap())

  var inventoryModel = PlayerInventoryModel.createNew()
  PlayerInventoryView(inventorySelector, inventoryModel)

  var playerVM = PlayerVM.createNew(
    PlayerModel.createNew(mapModel, { inventoryModel: inventoryModel })
  )
  PlayerView(playerSelector, playerVM, configService)
  new PlayerController(playerVM)
  new PlayerInventoryController(inventoryModel)

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
