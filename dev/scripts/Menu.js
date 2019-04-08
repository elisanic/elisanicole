(function(Menu, $) {
  const $menu = $('.js-menu');

  const menuToggle = () => {
    $menu.parent().toggleClass('is-active');
  }

  const bindUIActions = () => {
    $menu.on('click', () => {
      menuToggle();
      return false;
    });

    $('.js-nav a').on('click', function() {
      menuToggle();
      ene.Scroll.animate($(this).attr('href'));
      return false;
    });
  };

  Menu.init = () => {
    bindUIActions();
  };

}(ene.Menu = ene.Menu || {}, jQuery));
