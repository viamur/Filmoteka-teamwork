import * as basicLightbox from 'basiclightbox';

const createTrailerLink = elementRef => {
  const trailerBtn = elementRef;

  trailerBtn.forEach(el =>
    el.addEventListener('click', e => {
      showsModalTrailler(e.target.dataset.id);
    })
  );

  const showsModalTrailler = id => {
    const ApiKey = '0a4aab5daca4d3b8b09b771948ad9265';
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}&language=en-US`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const id = data.results[0].key;
        const instance = basicLightbox.create(`
  <iframe width="560" height="315" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
        instance.show();
        onCloseModalBtn(instance);
      })
      .catch(() => {
        const instance = basicLightbox.create(`
    <iframe width="560" height="315" src='https://www.youtube.com/embed/nCUZKOt7HxE' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `);

        instance.show();
        onCloseModalBtn(instance);
      });
  };

  function onCloseModalBtn(instance) {
    const modalBox = document.querySelector('.basicLightbox--iframe');
    modalBox.insertAdjacentHTML(
      'afterbegin',
      `<button
        type="button"
        class="trlightbox__btn"
        data-action="close-lightbox"
        ></button>
    `
    );
    const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]');
    modalCloseBtn.addEventListener('click', () => instance.close());
  }
};

export default { createTrailerLink };
