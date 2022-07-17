import Glide from '@glidejs/glide';
import filmsCardSliderTpl from '../partials/hbs/films-slider.hbs';
import trailer from './trailer.js';

const sliderContainer = document.querySelector('.js-slider-container');
GetTopViewsRender();

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 8,
  autoplay: 3000,
  hoverpause: true,
  bound: true,
});

glide.mount();

function GetTopViewsRender() {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=0a4aab5daca4d3b8b09b771948ad9265`;
  return fetch(url)
    .then(response => response.json())
    .then(({ results }) => {
      return results;
    })
    .then(renderSlider)
    .catch(err => {
      sliderContainer.innerHTML = `<img class="catch-error-pagination" src="${error}" />`;
    });
}

function renderSlider(articles) {
  sliderContainer.innerHTML = filmsCardSliderTpl(articles);
  trailer.createTrailerLink(document.querySelectorAll('.btn-youtube-slider'));
}
