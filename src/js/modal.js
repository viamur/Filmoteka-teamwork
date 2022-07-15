import { ApiFetchId } from './api-fetch-id';
import makeModal from '../partials/hbs/modal.hbs';
import * as basicLightbox from 'basiclightbox';

const fetchId = new ApiFetchId();
const list = document.querySelector('.library__list');

const onOpenModal = e => {
  e.preventDefault();
  console.log(e.target.closest('a'));
};

list.addEventListener('click', onOpenModal);
