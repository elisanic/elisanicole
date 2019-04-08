(function(Lazy, $) {
  let lazy;

  Lazy.init = () => {
    lazy = new LazyLoad();
  };

}(ene.Lazy = ene.Lazy || {}, jQuery));
