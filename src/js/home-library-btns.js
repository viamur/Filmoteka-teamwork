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
};

refs.homeBtn.addEventListener('click', onClickHomeBtn);
refs.libraryBtn.addEventListener('click', onClickLibraryBtn);
refs.watchedBtn.addEventListener('click', onClickWatchedBtn);
refs.queueBtn.addEventListener('click', onClickQueuedBtn);

console.dir(refs.header.style.backgroundImage);

export function onClickHomeBtn(e) {
  refs.searchForm.addEventListener('submit', searchHandler);

  searchTrand();
  tapHome();
}
function onClickLibraryBtn(e) {
  onClickWatchedBtn();
  tapibrary();
}
export function onClickWatchedBtn(e) {
  searchWatched();
  tapibrary();
}
export function onClickQueuedBtn(e) {
  searchQueue();
  tapibrary();
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
  refs.homeBtn.classList.remove('active');
  refs.libraryBtn.classList.add('active');
  refs.searchForm.classList.add('visually-hidden');
  refs.libraryBtns.classList.remove('visually-hidden');
  refs.searchForm.removeEventListener('submit', searchHandler);
}
function tapHome() {
  refs.homeBtn.classList.add('active');
  refs.libraryBtn.classList.remove('active');
  refs.searchForm.classList.remove('visually-hidden');
  refs.libraryBtns.classList.add('visually-hidden');
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
