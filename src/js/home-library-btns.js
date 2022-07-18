import {
  renderWatchedList,
  rederTrandList,
  renderQueueList,
} from './render-list';
import { searchInput } from './pagination';

const refs = {
  homeBtn: document.querySelector('.js-home-btn'),
  libraryBtn: document.querySelector('.js-library-btn'),
  watchedBtn: document.querySelector('.js-watched-btn'),
  queueBtn: document.querySelector('.js-queue-btn'),
  searchForm: document.querySelector('.js-search-form'),
  libraryBtns: document.querySelector('.js-library-btns'),
  listEl: document.querySelector('.js-list'),
  header: document.querySelector('.js-header'),
};

refs.homeBtn.addEventListener('click', onClickHomeBtn);
refs.libraryBtn.addEventListener('click', onClickLibraryBtn);
refs.watchedBtn.addEventListener('click', onClickWatchedBtn);
refs.queueBtn.addEventListener('click', onClickQueuedBtn);
refs.searchForm.addEventListener('submit', searchHandler);

console.dir(refs.header.style.backgroundImage);

function onClickHomeBtn(e) {
  e.preventDefault();
  swapListenersOnPressHomeBtn();
  swapClassActive();
  rederTrandList();
  swapClassHiden();
}
function onClickLibraryBtn(e) {
  e.preventDefault();
  swapListenersOnPressLibraryBtn();
  swapClassActive();
  renderWatchedList();
  swapClassHiden();
}
function onClickWatchedBtn(e) {
  e.preventDefault();
  swapListenersOnPressWatchedBtn();
  renderWatchedList();
}
function onClickQueuedBtn(e) {
  e.preventDefault();
  swapListenersOnPressQueuedBtn();
  renderQueueList();
}

/* Вспомогательные функции */

/* функция смены background на hero */
function changeBgndImg() {
  if (refs.homeBtn.classList.value.includes('active')) {
    return;
  }
  if (refs.libraryBtn.classList.value.includes('active')) {
    return;
  }
}

/* ф-ция смены visual-hiden на serch и кнопках Watched & Queued */
function swapClassHiden() {
  if (refs.searchForm.classList.value.includes('visually-hidden')) {
    refs.searchForm.classList.remove('visually-hidden');
    refs.libraryBtns.classList.add('visually-hidden');
    return;
  }
  if (refs.libraryBtns.classList.value.includes('visually-hidden')) {
    refs.searchForm.classList.add('visually-hidden');
    refs.libraryBtns.classList.remove('visually-hidden');
    return;
  }
}

/* Функция смены класса active на кнопках HOME & LIBRARI */
function swapClassActive() {
  if (refs.homeBtn.classList.value.includes('active')) {
    refs.homeBtn.classList.remove('active');
    refs.libraryBtn.classList.add('active');
    return;
  }
  if (refs.libraryBtn.classList.value.includes('active')) {
    refs.homeBtn.classList.add('active');
    refs.libraryBtn.classList.remove('active');
    return;
  }
}

/* Функция очистить фильмы в ДОМ */
function cleanFilmCardsInDom() {
  refs.listEl.innerHTML = '';
}

/* Функиция снятия слушателей при нажатии на HOME */

function swapListenersOnPressHomeBtn() {
  refs.homeBtn.removeEventListener('click', onClickHomeBtn);
  refs.libraryBtn.addEventListener('click', onClickLibraryBtn);
  refs.watchedBtn.removeEventListener('click', onClickWatchedBtn);
  refs.queueBtn.removeEventListener('click', onClickQueuedBtn);
  refs.searchForm.addEventListener('submit', searchHandler);
}

/* Функиция снятия слушателей при нажатии на LIBRARY */

function swapListenersOnPressLibraryBtn() {
  refs.homeBtn.addEventListener('click', onClickHomeBtn);
  refs.libraryBtn.removeEventListener('click', onClickLibraryBtn);
  refs.watchedBtn.addEventListener('click', onClickWatchedBtn);
  refs.queueBtn.addEventListener('click', onClickQueuedBtn);
  refs.searchForm.removeEventListener('submit', searchHandler);
}

/* Функиция снятия слушателей при нажатии на WATCHED */

function swapListenersOnPressWatchedBtn() {
  refs.watchedBtn.removeEventListener('click', onClickWatchedBtn);
  refs.queueBtn.addEventListener('click', onClickQueuedBtn);
}

/* Функиция снятия слушателей при нажатии на QUEUE */

function swapListenersOnPressQueuedBtn() {
  refs.watchedBtn.addEventListener('click', onClickWatchedBtn);
  refs.queueBtn.removeEventListener('click', onClickQueuedBtn);
}

/* Функция поиска */
function searchHandler(e) {
  e.preventDefault();
  const { searchQuery } = e.target.elements;
  /* console.log('searchQuery.value :>> ', searchQuery.value); */
  if (searchQuery.value.trim().length > 1) {
    // renderSearchList(searchQuery.value.trim());
    searchInput(searchQuery.value.trim());
  }
}
