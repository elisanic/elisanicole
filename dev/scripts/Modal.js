// (function(Modal, $) {
//   let $modal = $('.js-modal');
//
//   const bindUIActions = () => {
//     $('.js-modal-tile').on('click', function () {
//       let toShow = $(this).data('modal');
//       $('body').addClass('modal-active');
//       $(`.js-modal [data-modal=${toShow}]`).show().siblings('.modal-body').hide();
//       ene.Scroll.lock();
//     });
//
//     $('.js-modal > .modal-body').on('click', (e) => {
//       e.stopPropagation();
//     });
//
//     $('.js-modal').on('click', () => {
//       $('body').removeClass('modal-active');
//       ene.Scroll.unlock();
//     });
//   };
//
//   Modal.init = () => {
//     bindUIActions();
//   };
//
// }(ene.Modal = ene.Modal || {}, jQuery));
