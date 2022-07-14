import { ApiFetchId } from './api-fetch-id';
import makeModal from '../partials/hbs/modal.hbs';

const fetchId = new ApiFetchId();

const div = document.querySelector('.js-test');

const tex = fetchId.apiFetchId(453395).then(data => {
  div.innerHTML = makeModal(data);
});
