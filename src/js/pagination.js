import Pagination from 'tui-pagination';
import { api } from './converting-data';
import {
  rederTrandList,
  renderQueueList,
  renderWatchedList,
  renderSearchList,
} from './render-list';

const container = document.querySelector('.tui-pagination');

const pagination = new Pagination(container, {
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  firstItemClassName: 1,
  template: {
    currentPage: '<a class="page-btn is-selected">{{page}}</a>',
    page: '<a class="page-btn">{{page}}</a>',
    moveButton: `<button class="move-btn move-btn-{{type}}"></button>`,
    disabledMoveButton:
      '<button class="move-btn move-btn-{{type}} disabled" disabled></button>',
    moreButton: '<a class="page-btn next-is-ellip last-child">...</a>',
  },
});
// пагинация по инпуту
async function fetchPerPageSearch(page) {
  api.page = page;
  await renderSearchList(api.query);
}
export async function searchInput(query) {
  api.page = 1;
  api.query = query;

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    fetchPerPageSearch(currentPage);
    console.log(api.page);
  });
  await fetchPerPageSearch(1);

  pagination.reset(api.totalItems);
}
// пагинация по тренду
async function fetchPerPageTrand(page) {
  api.page = page;
  await rederTrandList();
}
export async function searchTrand() {
  api.page = 1;

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    fetchPerPageTrand(currentPage);
  });
  await fetchPerPageTrand(1);

  pagination.reset(api.totalItems);
}

// пагинация по queue
async function fetchPerPageQueue(page) {
  api.page = page;
  await renderQueueList();
}
export async function searchQueue() {
  api.page = 1;

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    fetchPerPageQueue(currentPage);
  });
  await fetchPerPageQueue(1);

  pagination.reset(api.totalItems);
}

// пагинация по Watched
async function fetchPerPageWatched(page) {
  api.page = page;
  await renderWatchedList();
}
export async function searchWatched() {
  api.page = 1;

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    fetchPerPageWatched(currentPage);
  });
  await fetchPerPageWatched(1);

  pagination.reset(api.totalItems);
}
