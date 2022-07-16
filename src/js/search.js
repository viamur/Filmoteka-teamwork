import { renderSearchList } from './render-list';
import Notiflix from 'notiflix';

const formRef = document.querySelector('.js-search-form');

const gallery = document.querySelector('.library__list');

function searchHandler(e) {
  e.preventDefault();
  const { searchQuery } = e.target.elements;
  console.log('searchQuery.value :>> ', searchQuery);
  /*  if (searchQuery.value.length > 1) {
    console.log('searchQuery.value :>> ', searchQuery);
    return searchQuery;
    console.log('searchQuery.value :>> ', searchQuery.value);
  } */
}

formRef.addEventListener('submit', renderSearchList());
