import { ApiFetchId } from './api-fetch-id';
import makeSearchGallery from '../partials/hbs/search-film-card.hbs';
import makeLibraryGallery from '../partials/hbs/library-film-card.hbs';
import { workLocStorage } from './local-storage';

const listEl = document.querySelector('.js-list');
const api = new ApiFetchId();

/* Сброс page на 1стр */
const pageOne = () => {
  api.page = 1;
};

/* Рендер карточек ТРЕНДОВЫХ */
const rederTrandList = () => {
  listEl.innerHTML = '';
  workLocStorage.setUserLocationPage(workLocStorage.VALUE_HOME);
  api.trandFetch().then(data => {
    listEl.innerHTML = makeSearchGallery(data);
  });
};

/* Рендер карточек с ПОИСКА */
const renderSearchList = query => {
  listEl.innerHTML = '';
  api.query = query;
  workLocStorage.setUserLocationPage(workLocStorage.VALUE_HOME);
  api.searchFetch().then(data => {
    if (data.length === 0) {
      document.querySelector('.js-search-warn').classList.remove('visually-hidden');
      return;
    }
    listEl.innerHTML = makeSearchGallery(data);
  });
};

/* Рендер карточек WATCHED */
const renderWatchedList = async () => {
  listEl.innerHTML = '';
  workLocStorage.setUserLocationPage(workLocStorage.VALUE_WATCHED);
  const arrLocalStorage = workLocStorage.getUserWatched();
  if (arrLocalStorage.length === 0 || arrLocalStorage === undefined) return;
  const newArrayList = arrLocalStorage.map(async id => {
    api.id = id;
    return await api.idFetch();
  });
  const allCardFilms = await Promise.all(newArrayList);
  listEl.innerHTML = makeLibraryGallery(allCardFilms);
};

/* Рендер карточек QUEUE */
const renderQueueList = async () => {
  listEl.innerHTML = '';
  workLocStorage.setUserLocationPage(workLocStorage.VALUE_QUEUE);
  const arrLocalStorage = workLocStorage.getUserQUEUE();
  if (arrLocalStorage.length === 0 || arrLocalStorage === undefined) return;
  const newArrayList = arrLocalStorage.map(async id => {
    api.id = id;
    return await api.idFetch();
  });
  const allCardFilms = await Promise.all(newArrayList);
  listEl.innerHTML = makeLibraryGallery(allCardFilms);
};

export { rederTrandList, pageOne, renderSearchList, renderWatchedList, renderQueueList };
