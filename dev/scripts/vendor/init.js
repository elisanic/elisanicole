/*
inits are triggered automatically
*/
(function () {
  for(let key in ene) {
    if(typeof ene[key].init === 'function') {
      ene[key].init();
    }
  }
})();
