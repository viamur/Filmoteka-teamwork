import axios from 'axios';
import Notiflix from 'notiflix';
import { searchFetch } from './api-fetch-id';
import moduleName from './render-list';
import cardTpl from '../partials/hbs/library-film-card.hbs';

const formRef = document.querySelector('.js-search-form');
const inputRef = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');

const gallery = document.querySelector('.library__list');

const fetchApi = new ApiFetchId();

const page = 1;
/* const query = '';

query = document.getElementById('inputRef').value; */

formRef.addEventListener('submit', renderSearchList('thor'));
