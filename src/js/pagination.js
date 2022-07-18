import Pagination from 'tui-pagination';
import { api } from './converting-data';
import { rederTrandList } from './render-list';
import { renderSearchList } from './render-list';
import { renderWatchedList } from './render-list';
import { renderQueueList } from './render-list';
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
  });
  await fetchPerPageSearch(1);

  pagination.reset(api.totalItems);
}

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
