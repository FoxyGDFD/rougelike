var effect = $import('@core/signal').effect

var PlayerView = function (container, viewModel) {
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
    xEl.textContent = viewModel.x.value
    playerTile.style.left = viewModel.x.value * TILE_SIZE + 'px'
    playerTile.style.top = viewModel.y.value * TILE_SIZE + 'px'
  })
  effect(function () {
    yEl.textContent = viewModel.y.value
  })
  effect(function () {
    healthEl.textContent = viewModel.health.value
    playerHealth.style.width = viewModel.health.value + '%'
  })
  effect(function () {
    goldEl.textContent = viewModel.gold.value
  })
  effect(function () {
    inventoryEl.textContent = viewModel.inventory.value.join(', ')
  })

  var moveBtn = container.querySelector('.move-btn')
  var damageBtn = container.querySelector('.damage-btn')
  var healBtn = container.querySelector('.heal-btn')
  var goldBtn = container.querySelector('.gold-btn')

  if (moveBtn)
    moveBtn.addEventListener('click', function () {
      viewModel.move(1, 1)
    })
  if (damageBtn)
    damageBtn.addEventListener('click', function () {
      viewModel.takeDamage(10)
    })
  if (healBtn)
    healBtn.addEventListener('click', function () {
      viewModel.heal(5)
    })
  if (goldBtn)
    goldBtn.addEventListener('click', function () {
      viewModel.addGold(50)
    })
}

module.exports = PlayerView
