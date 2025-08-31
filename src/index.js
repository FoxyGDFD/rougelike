'use strict';

function bootstrap() {
  var PlayerVM = $import('@domain/characters/player/player.view-model');
  var PlayerView = $import('@domain/characters/player/player.view');

  var player = PlayerVM.createNew();
  PlayerView(document.getElementById('player-container'), player);

}

bootstrap();
