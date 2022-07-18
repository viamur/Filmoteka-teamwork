/* Установить JQuery - npm install jquery */

/* function backToTop() {
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

backToTop(); */

function backToTop() {
  let button = document.querySelector('.back-to-top');

  window.addEventListener('scroll', e => {
    console.log('e :>> ', e);
    if (this.scrollTop() >= 50) {
      button.style = 'display: block';
    } else {
      button.style = 'display: none';
    }
  });

  button.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
      top: 1000,
      behavior: 'smooth',
    });
  });
}

backToTop();
