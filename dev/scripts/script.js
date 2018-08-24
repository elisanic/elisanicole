(function(ElisaNic, $) {
  const $window = $(window);
  const $html = $('html,body');
  const $toTop = $('.js-top');
  const $nav = $('.js-nav');
  const $menu = $('.js-menu');
  const $footer = $('.js-footer');

  let toTop = 0;
  let currScroll = 0;
  let prevScroll = 0;

  const animateScroll = (hash) => {
    let scrollTo = $(hash).length ? $(hash).offset().top - 140 : 0;
    $html.animate({ scrollTop: scrollTo }, 300);
  };

  const bindUIActions = () => {
    $html.removeClass('is-hidden');

    $menu.on('click', () => {
      $menu.parent().toggleClass('is-active');
      return false;
    });

    $window.on('scroll', () => {
        toTop = $toTop.offset().top;
        currScroll = $window.scrollTop();

        if (toTop >= $footer.offset().top - 55) {
            if (prevScroll < currScroll) {
                $toTop.css('position', 'absolute');
            } else if ($window.scrollTop() + $window.height() <= $footer.offset().top) {
                $toTop.css('position', 'fixed');
            }
        } else if (toTop > $('.h1').offset().top) {
            $toTop.fadeIn().css('position', 'fixed');
        }

        prevScroll = currScroll;
    });

    $toTop.on('click', (e) => {
      animateScroll($(e.target).attr('href'));
      return false;
    });

    $nav.find('a').on('click', (e) => {
      animateScroll($(e.target).attr('href'));
      return false;
    });
  };

  ElisaNic.init = () => {
    bindUIActions();
  };

}(window.ElisaNic = window.ElisaNic || {}, jQuery));
