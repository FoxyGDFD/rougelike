var { effect } = $import('@core/signal');

var PlayerView = function (container, viewModel) {
  var xEl = container.querySelector('.player-x');
  var yEl = container.querySelector('.player-y');
  var healthEl = container.querySelector('.player-health');
  var goldEl = container.querySelector('.player-gold');
  var inventoryEl = container.querySelector('.player-inventory');


  effect(function () { xEl.textContent = viewModel.x.value; });
  effect(function () { yEl.textContent = viewModel.y.value; });
  effect(function () { healthEl.textContent = viewModel.health.value; });
  effect(function () { goldEl.textContent = viewModel.gold.value; });
  effect(function () { inventoryEl.textContent = viewModel.inventory.value.join(', '); });

  var moveBtn = container.querySelector('.move-btn');
  var damageBtn = container.querySelector('.damage-btn');
  var healBtn = container.querySelector('.heal-btn');
  var goldBtn = container.querySelector('.gold-btn');
  var addItemBtn = container.querySelector('.add-item-btn');

  if (moveBtn) moveBtn.addEventListener('click', function () { viewModel.move(1, 1); });
  if (damageBtn) damageBtn.addEventListener('click', function () { viewModel.takeDamage(10); });
  if (healBtn) healBtn.addEventListener('click', function () { viewModel.heal(5); });
  if (goldBtn) goldBtn.addEventListener('click', function () { viewModel.addGold(50); });
  if (addItemBtn) addItemBtn.addEventListener('click', function () {
    var item = prompt('Enter item name:');
    if (item) viewModel.addItem(item);
  });
};

module.exports = PlayerView;
