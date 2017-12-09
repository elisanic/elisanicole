(function(ElisaNic, $) {
  'use strict';

  var $window = $(window),
      $html = $('html,body'),
      $toTop = $('.js-top'),
      $nav = $('.js-nav'),
      $menu = $('.js-menu'),
      $footer = $('.js-footer'),

      toTop = 0, currScroll = 0, prevScroll = 0;

  var animateScroll = function (hash) {
    var scrollTo = $(hash).length ? $(hash).offset().top - 140 : 0;
    $html.animate({ scrollTop: scrollTo }, 300);
  };

  var bindUIActions = function() {
    $html.removeClass('is-hidden');

    $menu.on('click', function () {
      $menu.parent().toggleClass('is-active');
      return false;
    });

    $window.on('scroll', function () {
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

    $toTop.on('click', function () {
      animateScroll($(this).attr('href'));
      return false;
    });

    $nav.find('a').on('click', function () {
      animateScroll($(this).attr('href'));
      return false;
    });
  };

  ElisaNic.init = function() {
    bindUIActions();
  };

}(window.ElisaNic = window.ElisaNic || {}, jQuery));
