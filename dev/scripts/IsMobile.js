(function(IsMobile, $) {
  let mobileBreakpoint = 700;

  IsMobile.check = () => {
    return window.innerWidth < 700;
  };

}(ene.IsMobile = ene.IsMobile || {}, jQuery));
