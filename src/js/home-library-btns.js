import { renderWatchedList, rederTrandList } from './render-list';
import { searchInput, searchQueue, searchWatched } from './pagination';

const refs = {
  homeBtn: document.querySelector('.js-home-btn'),
  libraryBtn: document.querySelector('.js-library-btn'),
  watchedBtn: document.querySelector('.js-watched-btn'),
  queueBtn: document.querySelector('.js-queue-btn'),
  searchForm: document.querySelector('.js-search-form'),
  libraryBtns: document.querySelector('.js-library-btns'),
  listEl: document.querySelector('.js-list'),
};

refs.homeBtn.addEventListener('click', onClickHomeBtn);
refs.libraryBtn.addEventListener('click', onClickLibraryBtn);
refs.watchedBtn.addEventListener('click', onClickWatchedBtn);
refs.queueBtn.addEventListener('click', onClickQueuedBtn);
refs.searchForm.addEventListener('submit', searchHandler);

console.dir(refs.searchForm.classList.value.includes('visually-hidden'));
console.dir(refs.libraryBtns.classList.value);
function onClickHomeBtn(e) {
  e.preventDefault();
  rederTrandList();
  swapClassHiden();
}
function onClickLibraryBtn(e) {
  e.preventDefault();
  cleanFilmCardsInDom();
  // renderWatchedList();
  swapClassHiden();
}
function onClickWatchedBtn(e) {
  e.preventDefault();
  renderWatchedList();
  searchWatched();
}
function onClickQueuedBtn(e) {
  e.preventDefault();
  searchQueue();
}

/* Вспомогательные функции */

/* функция смены background на hero */

/* ф-ция смены visual-hiden на serch и кнопках Watched & Queued */
function swapClassHiden() {
  if (!refs.searchForm.classList.value.includes('visually-hidden')) {
    refs.searchForm.classList.remove('visually-hidden');
    refs.libraryBtns.classList.add('visually-hidden');
  }
  if (refs.searchForm.classList.value.includes('visually-hidden')) {
    refs.searchForm.classList.add('visually-hidden');
    refs.libraryBtns.classList.remove('visually-hidden');
  }
}

/* Функция очистить фильмы в ДОМ */
function cleanFilmCardsInDom() {
  refs.listEl.innerHTML = '';
}

/* Функция поиска */
function searchHandler(e) {
  e.preventDefault();
  const { searchQuery } = e.target.elements;
  console.log('searchQuery.value :>> ', searchQuery.value);
  if (searchQuery.value.trim().length > 1) {
    // renderSearchList(searchQuery.value.trim());
    searchInput(searchQuery.value.trim());
  }
}
