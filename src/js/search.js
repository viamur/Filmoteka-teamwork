import axios from 'axios';
import Notiflix from 'notiflix';

const formRef = document.querySelector('.js-search-form');
const inputRef = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');

formRef.addEventListener('submit', doSearch);

let page = 1;
let searchQuevery = '';

/* Функция поиска */

function doSearch(event) {
  event.preventDefault();

  const inputedText = inputRef.value;

  if (inputedText.length <= 1) {
    return Notify.warning('Please type something');
  }
}
