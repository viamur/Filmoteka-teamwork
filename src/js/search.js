/* import { renderSearchList } from './render-list';
import Notiflix from 'notiflix';
import { searchInput } from './pagination';

const formRef = document.querySelector('.js-search-form');

const gallery = document.querySelector('.library__list');

function searchHandler(e) {
  e.preventDefault();
  const { searchQuery } = e.target.elements;
 // console.log('searchQuery.value :>> ', searchQuery.value); 
  if (searchQuery.value.trim().length > 1) {
    // renderSearchList(searchQuery.value.trim());
    searchInput(searchQuery.value.trim());
  }
}

formRef.addEventListener('submit', searchHandler); */
