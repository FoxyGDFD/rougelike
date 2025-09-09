var effect = $import('@core/signal').effect

function PlayerView(container, vm, configService) {
  this.config = configService.getConfig()
  this._vm = vm

  var xEl = container.querySelector('.player-x')
  var yEl = container.querySelector('.player-y')
  var healthEl = container.querySelector('.player-health')
  var goldEl = container.querySelector('.player-gold')

  var tileSize = this.config.tileSize

  var mapSelector = document.querySelector('.field')
  var playerTile = document.createElement('div')
  playerTile.className = 'tile tileP'
  mapSelector.appendChild(playerTile)

  var playerHealth = document.createElement('div')
  playerHealth.className = 'health'
  playerTile.appendChild(playerHealth)

  var self = this
  effect(function () {
    xEl.textContent = self._vm.coordinates.value.x
    yEl.textContent = self._vm.coordinates.value.y
    playerTile.style.left = self._vm.coordinates.value.x * tileSize + 'px'
    playerTile.style.top = self._vm.coordinates.value.y * tileSize + 'px'
  })
  effect(function () {
    healthEl.textContent = self._vm.health.value
    playerHealth.style.width = self._vm.health.value + '%'
  })
  effect(function () {
    goldEl.textContent = self._vm.gold.value
  })
}

module.exports = PlayerView
