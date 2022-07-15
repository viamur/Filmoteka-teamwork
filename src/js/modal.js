import { ApiFetchId } from './api-fetch-id';
import makeModal from '../partials/hbs/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import makeGallery from '../partials/hbs/search-film-card.hbs';

const fetchId = new ApiFetchId();
const list = document.querySelector('.library__list');
fetchId.page = 1;
const fetchAndMake = () => {
  fetchId.trandFetch().then(data => {
    console.log(data);
    list.innerHTML = makeGallery(data);
  });
};

fetchAndMake();
