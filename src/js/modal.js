import { ApiFetchId } from './api-fetch-id';
import makeModal from '../partials/hbs/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import makeGallery from '../partials/hbs/search-film-card.hbs';
import { workLocStorage } from './local-storage';

const fetchId = new ApiFetchId();
const list = document.querySelector('.library__list');
fetchId.page = 3;
const fetchAndMake = () => {
  fetchId.trandFetch().then(data => {
    list.innerHTML = makeGallery(data);
  });
};

fetchAndMake();

// fetchId.genreListFetch().then(data => console.log(data));

// workLocStorage.addUserQUEUE(13);
// workLocStorage.addUserQUEUE(14);
// workLocStorage.addUserQUEUE(14);
workLocStorage.delUserQUEUE(15);

console.log(workLocStorage.getUserQUEUE());
