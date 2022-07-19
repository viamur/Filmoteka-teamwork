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
import './js/search';
import { workLocStorage } from './js/local-storage';
import './js/footer-modal';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
Loading.standard();
import './js/back-to-top';
import './js/home-library-btns';
import { onClickHomeBtn, onClickWatchedBtn, onClickQueuedBtn } from './js/home-library-btns';
import { searchTrand } from './js/pagination';
import './js/theme';

// window.onload = () => {
if (
  workLocStorage.getUserLocationPage() === undefined ||
  workLocStorage.getUserLocationPage() === workLocStorage.VALUE_HOME
) {
  /* функция, отрисовка главной страницы трендовые фильмы */
  // onClickHomeBtn();
  onClickHomeBtn();
} else if (workLocStorage.getUserLocationPage() === workLocStorage.VALUE_QUEUE) {
  /* функиця, отрисовка вкладки QUEUE */
  onClickQueuedBtn();
} else if (workLocStorage.getUserLocationPage() === workLocStorage.VALUE_WATCHED) {
  /* функция, отрисовки вкладки  WATCHED */
  onClickWatchedBtn();
} else {
  const ulEl = document.querySelector('.js-list');
  ulEl.innerHTML = `  <li>
    <h3>Error</h3>
  </li>`;
  console.log('Ошибка в index.js, по поиску где находился user');
}
// };
window.onload = Loading.remove();
