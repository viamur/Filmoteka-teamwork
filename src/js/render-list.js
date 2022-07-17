import makeSearchGallery from '../partials/hbs/search-film-card.hbs';
import makeLibraryGallery from '../partials/hbs/library-film-card.hbs';
import { workLocStorage } from './local-storage';
import { newDataTrand, newDataSearch, newDataId, api } from './converting-data';
import { searchInput } from './pagination';
/* в этом js для обращения к api запроса используем из import выше */

const listEl = document.querySelector('.js-list');

/* Сброс page на 1стр */
const pageOne = () => {
  api.page = 1;
};
/* Рендер карточек ТРЕНДОВЫХ */
const rederTrandList = () => {
  listEl.innerHTML = '';
  workLocStorage.setUserLocationPage(workLocStorage.VALUE_HOME);
  newDataTrand().then(data => {
    listEl.innerHTML = makeSearchGallery(data);
  });
};

/* Рендер карточек с ПОИСКА */
const renderSearchList = query => {
  listEl.innerHTML = '';
  api.query = query;
  workLocStorage.setUserLocationPage(workLocStorage.VALUE_HOME);
  newDataSearch().then(data => {
    console.log(data);
    const container = document.querySelector('.tui-pagination');
    // searchInput(query);
    container.classList.remove('is-hidden');
    if (data.length / 20 < 1) {
      container.classList.add('is-hidden');
    }
    if (data.length / 20 > 1) {
      container.classList.remove('is-hidden');
    }
    if (data.length === 0) {
      document
        .querySelector('.js-search-warn')
        .classList.remove('visually-hidden');
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
  if (arrLocalStorage === undefined || arrLocalStorage.length === 0) return;
  const newArrayList = arrLocalStorage.map(async id => {
    api.id = id;
    return await newDataId();
  });
  const allCardFilms = await Promise.all(newArrayList);
  listEl.innerHTML = makeLibraryGallery(allCardFilms);
};

/* Рендер карточек QUEUE */
const renderQueueList = async () => {
  listEl.innerHTML = '';
  workLocStorage.setUserLocationPage(workLocStorage.VALUE_QUEUE);
  const arrLocalStorage = workLocStorage.getUserQUEUE();
  if (arrLocalStorage === undefined || arrLocalStorage.length === 0) return;
  const newArrayList = arrLocalStorage.map(async id => {
    api.id = id;
    return await newDataId();
  });
  const allCardFilms = await Promise.all(newArrayList);
  listEl.innerHTML = makeLibraryGallery(allCardFilms);
};

export {
  rederTrandList,
  pageOne,
  renderSearchList,
  renderWatchedList,
  renderQueueList,
};
