var effect = $import('@core/signal').effect

var PlayerView = function (container, vm) {
  var xEl = container.querySelector('.player-x')
  var yEl = container.querySelector('.player-y')
  var healthEl = container.querySelector('.player-health')
  var goldEl = container.querySelector('.player-gold')
  var inventoryEl = container.querySelector('.player-inventory')

  var TILE_SIZE = 35

  var field = document.querySelector('.field')
  var playerTile = document.createElement('div')
  playerTile.className = 'tile tileP'

  field.appendChild(playerTile)

  var playerHealth = document.createElement('div')
  playerHealth.className = 'health'
  playerTile.appendChild(playerHealth);

  effect(function () {
    xEl.textContent = vm.coordinates.value.x
    yEl.textContent = vm.coordinates.value.y
    playerTile.style.left = vm.coordinates.value.x * TILE_SIZE + 'px'
    playerTile.style.top = vm.coordinates.value.y * TILE_SIZE + 'px'
  }.bind(this))
  effect(function () {
    healthEl.textContent = vm.health.value
    playerHealth.style.width = vm.health.value + '%'
  }.bind(this))
  effect(function () {
    goldEl.textContent = vm.gold.value
  }.bind(this))


  var damageBtn = container.querySelector('.damage-btn')
  var healBtn = container.querySelector('.heal-btn')
  var goldBtn = container.querySelector('.gold-btn')

  if (damageBtn)
    damageBtn.addEventListener('click', function () {
      vm.takeDamage(10)
    })
  if (healBtn)
    healBtn.addEventListener('click', function () {
      vm.heal(5)
    })
  if (goldBtn)
    goldBtn.addEventListener('click', function () {
      vm.addGold(50)
    })

  document.addEventListener('keydown', function (event) {
    var key = event.key
    if (key === 'a') {
      vm.move(-1, 0);
    } else if (key === 'd') {
      vm.move(1, 0);
    } else if (key === 's') {
      vm.move(0, 1);
    } else if (key === 'w') {
      vm.move(0, -1);
    }
  })
}

module.exports = PlayerView
