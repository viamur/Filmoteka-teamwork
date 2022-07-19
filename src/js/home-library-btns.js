import { renderWatchedList, rederTrandList, renderQueueList } from './render-list';
import { searchInput, searchQueue, searchWatched, searchTrand } from './pagination';

const refs = {
  homeBtn: document.querySelector('.js-home-btn'),
  libraryBtn: document.querySelector('.js-library-btn'),
  watchedBtn: document.querySelector('.js-watched-btn'),
  queueBtn: document.querySelector('.js-queue-btn'),
  searchForm: document.querySelector('.js-search-form'),
  libraryBtns: document.querySelector('.js-library-btns'),
  listEl: document.querySelector('.js-list'),
  header: document.querySelector('.js-header'),
  logo: document.querySelector('.header__link'),
  h2: document.querySelector('.library__title'),
  span: document.querySelector('.library__span'),
  pagination: document.querySelector('.tui-pagination'),
  errSpan: document.querySelector('.js-search-warn'),
};

refs.homeBtn.addEventListener('click', onClickHomeBtn);
refs.libraryBtn.addEventListener('click', onClickLibraryBtn);
refs.watchedBtn.addEventListener('click', onClickWatchedBtn);
refs.queueBtn.addEventListener('click', onClickQueuedBtn);
refs.logo.addEventListener('click', onClickLogo);

function onClickLogo(e) {
  e.preventDefault();
  onClickHomeBtn();
}

export function onClickHomeBtn(e) {
  refs.searchForm.addEventListener('submit', searchHandler);
  refs.queueBtn.classList.remove('active');
  refs.watchedBtn.classList.remove('active');
  tapHome();
  searchTrand();
}
function onClickLibraryBtn(e) {
  tapibrary();
  onClickWatchedBtn();
}
export function onClickWatchedBtn(e) {
  refs.watchedBtn.classList.add('active');
  refs.queueBtn.classList.remove('active');
  tapibrary();
  searchWatched();
}
export function onClickQueuedBtn(e) {
  refs.watchedBtn.classList.remove('active');
  refs.queueBtn.classList.add('active');
  tapibrary();
  searchQueue();
}

/* Вспомогательные функции */

/* функция смены background на hero */
// function changeBgndImg() {
//   if (refs.homeBtn.classList.value.includes('active')) {
//     refs.header.style.backgroundImage = '../images/home/desktop/header-bg-desktop.jpg';
//     return;
//   }
//   if (refs.libraryBtn.classList.value.includes('active')) {
//     refs.header.style.backgroundImage = './images/library/desktop/header-bg-desktop.jpg';
//     return;
//   }
// }

/* ф-ция смены visual-hiden на serch и кнопках Watched & Queued */
/* При нажатии на либрери */
function tapibrary() {
  refs.header.classList.add('js-library');
  refs.homeBtn.classList.remove('active');
  refs.libraryBtn.classList.add('active');
  refs.searchForm.classList.add('visually-hidden');
  refs.libraryBtns.classList.remove('visually-hidden');
  refs.searchForm.removeEventListener('submit', searchHandler);
  refs.h2.classList.add('visually-hidden');
  refs.pagination.classList.add('is-hidden');
  refs.errSpan.classList.add('visually-hidden');
}
function tapHome() {
  refs.errSpan.classList.add('visually-hidden');
  refs.header.classList.remove('js-library');
  refs.homeBtn.classList.add('active');
  refs.libraryBtn.classList.remove('active');
  refs.searchForm.classList.remove('visually-hidden');
  refs.libraryBtns.classList.add('visually-hidden');
  refs.h2.classList.add('visually-hidden');
  refs.pagination.classList.add('is-hidden');
}

/* Функция поиска */
function searchHandler(e) {
  e.preventDefault();
  const { searchQuery } = e.target.elements;
  if (searchQuery.value.trim().length > 1) {
    searchInput(searchQuery.value.trim());
    refs.span.textContent = searchQuery.value.trim();
    refs.h2.classList.remove('visually-hidden');
    refs.searchForm.reset();
  }
}
