import makeModal from '../partials/hbs/modal.hbs';
import { newDataId, api } from './converting-data';
import { workLocStorage } from './local-storage';

const listEl = document.querySelector('.js-list');
const backdropEl = document.querySelector('[data-modal]');

const closeFn = () => {
  const closeBtnEl = document.querySelector('.js-modal-close');
  const close = () => {
    backdropEl.classList.add('is-hidden');
    backdropEl.innerHTML = '';
    document.body.classList.remove('no-scroll');
    removeEventListener();
  };
  const closeBackdropHandler = e => {
    if (e.target.dataset.modal !== '') return;
    close();
  };
  const onKeyDownEscape = e => {
    if (e.code !== 'Escape') return;
    close();
  };
  const removeEventListener = () => {
    document.removeEventListener('keydown', onKeyDownEscape);
    closeBtnEl.removeEventListener('click', close);
    backdropEl.removeEventListener('click', closeBackdropHandler);
  };
  backdropEl.addEventListener('click', closeBackdropHandler);
  document.addEventListener('keydown', onKeyDownEscape);
  closeBtnEl.addEventListener('click', close);
};

const checkedBtnWatched = (id, btn) => {
  const wchArr = workLocStorage.getUserWatched(id);
  if (!wchArr || wchArr.length === 0 || !wchArr.find(el => el === id)) {
    btn.dataset.action = 'add';
    return;
  }
  btn.dataset.action = 'del';
  btn.classList.add('active');
  btn.textContent = 'delete from watch';
};

const checkedBtnQueue = (id, btn) => {
  const wchArr = workLocStorage.getUserQUEUE(id);
  if (!wchArr || wchArr.length === 0 || !wchArr.find(el => el === id)) {
    btn.dataset.action = 'add';
    return;
  }
  btn.dataset.action = 'del';
  btn.classList.add('active');
  btn.textContent = 'delete from queue';
};

const actionBtnWatched = (id, btn) => {
  const action = btn.dataset.action;
  if (action === 'add') {
    workLocStorage.addUserWatched(id);
    btn.dataset.action = 'del';
    btn.classList.add('active');
    btn.textContent = 'delete from watch';
    return;
  }
  if (action === 'del') {
    workLocStorage.delUserWatched(id);
    btn.dataset.action = 'add';
    btn.classList.remove('active');
    btn.textContent = 'add to Watched';
    return;
  }
};
const actionBtnQueue = (id, btn) => {
  const action = btn.dataset.action;
  if (action === 'add') {
    workLocStorage.addUserQUEUE(id);
    btn.dataset.action = 'del';
    btn.classList.add('active');
    btn.textContent = 'delete from queue';
    return;
  }
  if (action === 'del') {
    workLocStorage.delUserQUEUE(id);
    btn.dataset.action = 'add';
    btn.classList.remove('active');
    btn.textContent = 'add to queue';
    return;
  }
};
const onOpenModal = async e => {
  if (e.target.nodeName === 'UL') return;
  e.preventDefault();
  const itemElId = e.target.closest('li').id;
  api.id = itemElId;
  const data = await newDataId();

  backdropEl.innerHTML = makeModal(data);
  backdropEl.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');

  const watchBtnEl = backdropEl.querySelector('.js-modal-watched');
  const queueBtnEl = backdropEl.querySelector('.js-modal-queue');
  checkedBtnWatched(itemElId, watchBtnEl);
  checkedBtnQueue(itemElId, queueBtnEl);

  const onWatchBtn = e => actionBtnWatched(itemElId, e.target);
  const onQueueBtn = e => actionBtnQueue(itemElId, e.target);

  watchBtnEl.addEventListener('click', onWatchBtn);
  queueBtnEl.addEventListener('click', onQueueBtn);
  closeFn();
};
listEl.addEventListener('click', onOpenModal);
