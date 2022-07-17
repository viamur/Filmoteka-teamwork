import Pagination from 'tui-pagination';
import { api } from './converting-data';
import { rederTrandList } from './render-list';
import { renderSearchList } from './render-list';
import { totalPages } from './api-fetch-id';

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

pagination.on('afterMove', event => {
  const currentPage = event.page;
  fetchPerPage(currentPage);
});
async function fetchPerPage(page) {
  api.page = page;
  const pesponse = await api.trandFetch();
  await rederTrandList();

  if (page === 1) pagination.reset(pesponse.total_results);
}
document.onload = fetchPerPage(1);

export function searchInput(query) {
  const container = document.getElementById('tui-pagination-container');
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

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    fetchPerPage(currentPage);
  });

  async function fetchPerPage(page) {
    api.page = page;
    const pesponse = await api.searchFetch();
    await renderSearchList(query);

    if (page === 1) pagination.reset(pesponse.total_results);
  }
  document.onload = fetchPerPage(1);
}
