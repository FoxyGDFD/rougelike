function PlayerController(playerVM) {
  this._vm = playerVM

  var self = this

  document.addEventListener('keydown', function (event) {
    var key = event.key
    if (key === 'a') self._vm.move(-1, 0)
    else if (key === 'd') self._vm.move(1, 0)
    else if (key === 'w') self._vm.move(0, -1)
    else if (key === 's') self._vm.move(0, 1)
    else if (key === 'e') self._vm.useItem()
    // else if (key === ' ') self._vm.attack()
  })

  document.addEventListener('wheel', function (event) {
    if (event.deltaY > 0) self._vm.nextItem()
    else self._vm.prevItem()

    console.warn(
      'Selected item:',
      self._vm.getCurrentItem() ? self._vm.getCurrentItem().name : 'None'
    )
  })
}

module.exports = PlayerController
