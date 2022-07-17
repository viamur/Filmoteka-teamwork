import './js/modal';
import './js/slider';
import './js/trailer';
import {
  rederTrandList,
  renderSearchList,
  renderWatchedList,
  renderQueueList,
} from './js/render-list';
import './js/converting-data';
import './js/pagination';
import './js/search';
import { workLocStorage } from './js/local-storage';
import './js/footer-modal';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
Loading.standard();
if (
  workLocStorage.getUserLocationPage() === undefined ||
  workLocStorage.getUserLocationPage() === workLocStorage.VALUE_HOME
) {
  /* функция, отрисовка главной страницы трендовые фильмы */
  // rederTrandList();
} else if (workLocStorage.getUserLocationPage() === workLocStorage.VALUE_QUEUE) {
  /* функиця, отрисовка вкладки QUEUE */
  renderQueueList();
} else if (workLocStorage.getUserLocationPage() === workLocStorage.VALUE_WATCHED) {
  /* функция, отрисовки вкладки  WATCHED */
  renderWatchedList();
} else {
  const ulEl = document.querySelector('.js-list');
  ulEl.innerHTML = `  <li>
    <h3>Error</h3>
  </li>`;
  console.log('Ошибка в index.js, по поиску где находился user');
}
