(function () {
  'use strict';

  window.$import = $import;


  console.log('Custom require function initialized with aliases:');
  console.log(Object.keys($import.getAllAliases()));

  var Player = $import('@domain/characters/player').createNew();
  console.log(Player)
})()