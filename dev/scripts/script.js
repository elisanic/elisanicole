(function(ElisaNic, $) {
  const $window = $(window);
  const $toTop = $('.js-top');
  const $menu = $('.js-menu');

  const isMobile = () => {
    return window.innerWidth < 700;
  };

  const animateScroll = (hash) => {
    let scrollTo = $(hash).length ? $(hash).offset().top: 0;

    if(isMobile()) {
      scrollTo = scrollTo - 132;
    }

    $('html,body').animate({
      scrollTop: scrollTo
    }, 300);
  };

  const menuToggle = () => {
    $menu.parent().toggleClass('is-active');
  }

  const bindUIActions = () => {
    $menu.on('click', () => {
      menuToggle();
      return false;
    });

    $window.on('scroll', () => {
      let currScroll = $window.scrollTop();
      let minToShow = window.innerHeight / 2;

      if (currScroll > minToShow) {
        $toTop.fadeIn().css('position', 'fixed');
      } else {
        $toTop.fadeOut();
      }
    });

    $toTop.on('click', function() {
      animateScroll($(this).attr('href'));
      return false;
    });

    $('.js-nav a').on('click', function() {
      menuToggle();
      animateScroll($(this).attr('href'));
      return false;
    });
  };

  ElisaNic.init = () => {
    bindUIActions();
  };

}(window.ElisaNic = window.ElisaNic || {}, jQuery));
