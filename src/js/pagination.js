import Pagination from 'tui-pagination';
import { ApiFetchId } from './api-fetch-id';
import cardTpl from '../partials/hbs/library-film-card.hbs';

const fetchApi = new ApiFetchId();
const gallery = document.querySelector('.library__list');

const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination(container, {
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: false,
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
  fetchApi.query = '';
  fetchApi.page = page;
  const response = await fetchApi.trandFetch();

  gallery.innerHTML = cardTpl(response.results);
  if (page === 1) pagination.reset(response.total_results);
}
document.onload = fetchPerPage(1);
