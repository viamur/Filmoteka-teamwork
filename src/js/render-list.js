import makeSearchGallery from '../partials/hbs/search-film-card.hbs';
import makeLibraryGallery from '../partials/hbs/library-film-card.hbs';
import { workLocStorage } from './local-storage';
import { newDataTrand, newDataSearch, newDataId, api } from './converting-data';

/* в этом js для обращения к api запроса используем из import выше */

const container = document.querySelector('.tui-pagination');
const listEl = document.querySelector('.js-list');

/* Сброс page на 1стр */
const pageOne = () => {
  api.page = 1;
};
/* Рендер карточек ТРЕНДОВЫХ */
const rederTrandList = () => {
  listEl.innerHTML = '';
  container.classList.remove('is-hidden');
  workLocStorage.setUserLocationPage(workLocStorage.VALUE_HOME);
  return newDataTrand().then(data => {
    listEl.innerHTML = makeSearchGallery(data);
  });
};

/* Рендер карточек с ПОИСКА */
const renderSearchList = query => {
  listEl.innerHTML = '';
  api.query = query;
  workLocStorage.setUserLocationPage(workLocStorage.VALUE_HOME);
  return newDataSearch().then(data => {
    const errSpan = document.querySelector('.js-search-warn');
    errSpan.classList.add('visually-hidden');

    listEl.innerHTML = makeSearchGallery(data);
    swapPaginator(data);
    if (data.length === 0) {
      errSpan.classList.remove('visually-hidden');
      renderNoFound();
      return;
    }
  });
};

/* Рендер карточек WATCHED */
const renderWatchedList = async () => {
  listEl.innerHTML = '';
  workLocStorage.setUserLocationPage(workLocStorage.VALUE_WATCHED);
  const arrLocalStorage = workLocStorage.getUserWatched();
  if (arrLocalStorage === undefined || arrLocalStorage.length === 0) {
    renderNoFound();
    return;
  }
  swapPaginator(arrLocalStorage);
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
  if (arrLocalStorage === undefined || arrLocalStorage.length === 0) {
    renderNoFound();
    return;
  }
  swapPaginator(arrLocalStorage);
  const newArrayList = arrLocalStorage.map(async id => {
    api.id = id;
    return await newDataId();
  });
  const allCardFilms = await Promise.all(newArrayList);
  listEl.innerHTML = makeLibraryGallery(allCardFilms);
};

/* Рендер при нинайденых фильмах */
function renderNoFound() {
  listEl.innerHTML =
    '<li style="margin: 0 auto;"><img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif?20060930131405" alt="hors" ></li>';
}

/* Проверяет totalPages и убирает или добовляет пагинатор */
function swapPaginator(data) {
  container.classList.remove('is-hidden');
  if (data.length / 20 < 1) {
    container.classList.add('is-hidden');
  }
  if (data.length / 20 > 1) {
    container.classList.remove('is-hidden');
  }
}

export { rederTrandList, pageOne, renderSearchList, renderWatchedList, renderQueueList };
