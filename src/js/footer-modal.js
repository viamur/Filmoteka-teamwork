const openFooterModalBtn = document.querySelector(
  '[data-action="open-footer-modal"]'
);

const closeFooterModalBtn = document.querySelector(
  '[data-action="close-footer-modal"]'
);
const footerBackdrop = document.querySelector('.js-footer-backdrop');

openFooterModalBtn.addEventListener('click', onOpenFooterModal);
closeFooterModalBtn.addEventListener('click', onCloseFooterModal);
footerBackdrop.addEventListener('click', onFooterBackdropClick);

function onOpenFooterModal() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-footer-modal');
  footerBackdrop.style = 'display:flex';
}

function onCloseFooterModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-footer-modal');
  footerBackdrop.style = 'display:none';
}

function onFooterBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseFooterModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseFooterModal();
  }
}

// Team

const galleryItems = [
  {
    preview:
      'https://ca.slack-edge.com/T032KVART1A-U03B76QA2MU-8a3f2c4fd17d-512',
    name: 'Serhii Moskalenko',
    title: 'Team Lead',
  },
  {
    preview:
      'https://media-exp1.licdn.com/dms/image/C5603AQE-6T_u64As2w/profile-displayphoto-shrink_800_800/0/1528541807238?e=1663200000&v=beta&t=aLWA8jIfjOzYIrhpsshAd5cvqBCMV9K1MZX9sUOPWKI',
    name: 'Hanna Lytvynenko',
    title: 'Scrum Master',
  },
  {
    preview:
      'https://ca.slack-edge.com/T032KVART1A-U033V10KFST-7d2de64cc619-512',
    name: 'Alexandr Shereshkov',
    title: 'Developer',
  },
  {
    preview:
      'https://ca.slack-edge.com/T032KVART1A-U039L5ANENQ-9b3e7be0b070-512',
    name: 'Alexey Demidov',
    title: 'Developer',
  },
  {
    preview:
      'https://media-exp1.licdn.com/dms/image/C5603AQELYgXOUXUJjg/profile-displayphoto-shrink_800_800/0/1516509916914?e=1663200000&v=beta&t=qm8B5eTx3d2q80btjib1CmfjnxvQtPxgmkp0DGoO9Ek',
    name: 'Iryna Kudria',
    title: 'Developer',
  },
  {
    preview:
      'https://ca.slack-edge.com/T032KVART1A-U0384S7ACQ2-944bc6637c44-512',
    name: 'Maksym Lizohub',
    title: 'Developer',
  },
];

const galleryContainer = document.querySelector('.gallery');

const cardsMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, name, title }) => {
      return `<div class="gallery__item">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${name}"
    />
    <div class="gallery__info">
    <p class="gallery__name">${name}</p>
    <p class="gallery__title">${title}</p>
    </div>
  
</div>`;
    })
    .join('');
}
