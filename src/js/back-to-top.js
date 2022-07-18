/* Установить JQuery - npm install jquery */

function backToTop() {
  let button = $('.back-to-top');

  $(window).on('scroll', () => {
    if ($(this).scrollTop() >= 50) {
      button.fadeIn();
    } else {
      button.fadeOut();
    }
  });

  button.on('click', e => {
    e.preventDefault();
    $('html').animate({ scrollTop: 0 }, 1000);
  });
}

backToTop();

/* import throttle from 'lodash.throttle';

function backToTop() {
  let button = document.querySelector('.back-to-top');

  window.addEventListener('scroll', throttle(onScroll, 200));

  function onScroll(e) {
    if (e) {
      button.style = 'display: block';
    } else {
      button.style = 'display: none';
    }
    console.log('e :>> ', e);
  }

  button.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

backToTop(); */
