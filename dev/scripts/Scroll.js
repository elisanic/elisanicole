(function(Scroll, $) {

  Scroll.animate = (hash) => {
    let scrollTo = $(hash).length ? $(hash).offset().top: 0;

    if(ene.IsMobile.check()) {
      scrollTo = scrollTo - 132;
    }

    $('html,body').animate({
      scrollTop: scrollTo
    }, 300);
  };

  const bindUIActions = () => {
    $(window).on('scroll', () => {
      let currScroll = $window.scrollTop();
      let minToShow = window.innerHeight / 2;

      if (currScroll > minToShow) {
        $('.js-top').fadeIn().css('position', 'fixed');
      } else {
        $('.js-top').fadeOut();
      }
    });

    $('.js-top').on('click', function() {
      Scroll.animate($(this).attr('href'));
      return false;
    });
  };

  Scroll.lock = () => {

  };

  Scroll.unlock = () => {

  };

  Scroll.init = () => {

  };

}(ene.Scroll = ene.Scroll || {}, jQuery));
