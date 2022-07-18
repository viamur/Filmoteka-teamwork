import Pagination from 'tui-pagination';
import { api } from './converting-data';
import {
  rederTrandList,
  renderQueueList,
  renderWatchedList,
  renderSearchList,
} from './render-list';

const container = document.querySelector('.tui-pagination');

const options = {
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  firstItemClassName: 1,
  template: {
    currentPage: '<a class="page-btn is-selected">{{page}}</a>',
    page: '<a class="page-btn">{{page}}</a>',
    moveButton: `<button class="move-btn move-btn-{{type}}"></button>`,
    disabledMoveButton: '<button class="move-btn move-btn-{{type}} disabled" disabled></button>',
    moreButton: '<a class="page-btn next-is-ellip last-child">...</a>',
  },
};
const pagination = new Pagination(container, options);
const paginationA = new Pagination(container, options);
const paginationB = new Pagination(container, options);
const paginationC = new Pagination(container, options);
// пагинация по инпуту
async function fetchPerPageSearch(page) {
  api.page = page;
  await renderSearchList(api.query);
}
export async function searchInput(query) {
  pagination.setItemsPerPage(20);
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
// пагинация по тренду paginationA
async function fetchPerPageTrand(page) {
  api.page = page;
  await rederTrandList();
}
export async function searchTrand() {
  paginationA.setItemsPerPage(20);
  api.page = 1;

  paginationA.on('afterMove', event => {
    const currentPage = event.page;
    fetchPerPageTrand(currentPage);
  });
  await fetchPerPageTrand(1);

  paginationA.reset(api.totalItems);
}

function forWatchedAndQueueB() {
  const windowWidthPag = window.innerWidth;
  if (windowWidthPag < 768) {
    paginationB.setItemsPerPage(4);
  }
  if (windowWidthPag >= 768 && windowWidthPag < 1280) {
    paginationB.setItemsPerPage(8);
  }
  if (windowWidthPag >= 1280) {
    paginationB.setItemsPerPage(9);
  }
}
function forWatchedAndQueueC() {
  const windowWidthPag = window.innerWidth;
  if (windowWidthPag < 768) {
    paginationC.setItemsPerPage(4);
  }
  if (windowWidthPag >= 768 && windowWidthPag < 1280) {
    paginationC.setItemsPerPage(8);
  }
  if (windowWidthPag >= 1280) {
    paginationC.setItemsPerPage(9);
  }
}
// пагинация по queue
async function fetchPerPageQueue(page) {
  api.page = page;
  await renderQueueList();
}
export async function searchQueue() {
  forWatchedAndQueueB();
  api.page = 1;

  paginationB.on('afterMove', event => {
    const currentPage = event.page;
    fetchPerPageQueue(currentPage);
  });
  await fetchPerPageQueue(1);

  paginationB.reset(api.totalItems);
}

// пагинация по Watched
async function fetchPerPageWatched(page) {
  api.page = page;
  await renderWatchedList();
}
export async function searchWatched() {
  forWatchedAndQueueC();
  api.page = 1;

  paginationC.on('afterMove', event => {
    const currentPage = event.page;
    fetchPerPageWatched(currentPage);
  });
  await fetchPerPageWatched(1);

  paginationC.reset(api.totalItems);
}
