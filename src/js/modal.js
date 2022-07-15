import { ApiFetchId } from './api-fetch-id';
import makeModal from '../partials/hbs/modal.hbs';
import * as basicLightbox from 'basiclightbox';

const fetchId = new ApiFetchId();

const div = document.querySelector('.js-modal-close');

fetchId.apiFetchId(453395).then(data => {
  const ca = basicLightbox.create(makeModal(data)).show();
});
