import { ApiFetchId } from './api-fetch-id';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

/* теперь везде используем на сайте эту api */
const api = new ApiFetchId();
/* вытягиваем данные жанров и делаем id-ключ, жанр-value */
const genreObj = api
  .genreListFetch()
  .then(data => {
    return { ...data };
  })
  .then(obj => {
    const newObj = {};
    for (let key in obj) {
      let nk = Object.values(obj[key]);
      let keyO = nk[0];
      let valueO = nk[1];
      newObj[keyO] = valueO;
    }
    return newObj;
  });

/* Записуем в переменную расширение экрана */
const windowWidth = window.innerWidth;
/* конвертируем данные и возвращаем промис с новыми данными для ТРЕНДА */
const newDataTrand = async () => {
  Loading.circle();
  const respons = await api.trandFetch();
  const newArr = respons.results.map(async obj => {
    const year = obj.release_date?.split('-').slice(0, 1).join('') || '';

    const newRespons = await genreObj;
    let genre;
    let screen;

    if (windowWidth < 768) {
      screen = {
        mob: true,
        tab: false,
        desc: false,
      };
    }
    if (windowWidth >= 768 && windowWidth < 1280) {
      screen = {
        mob: false,
        tab: true,
        desc: false,
      };
    }
    if (windowWidth >= 1280) {
      screen = {
        mob: false,
        tab: false,
        desc: true,
      };
    }

    if (obj.genre_ids.length === 0) {
      genre = ['No genres'];
    } else if (obj.genre_ids.length <= 2) {
      genre = obj.genre_ids.map(id => {
        return newRespons[id];
      });
    } else if (obj.genre_ids.length > 2) {
      const genres = obj.genre_ids.slice(0, 3).map(id => {
        return newRespons[id];
      });
      genres[2] = 'Other';
      genre = genres;
    }

    return {
      ...obj,
      year,
      genre,
      screen,
    };
  });
  Loading.remove();
  return await Promise.all(newArr);
};

/* конвертация данных для ПОИСКА */
const newDataSearch = async () => {
  Loading.circle();
  const respons = await api.searchFetch();

  const newArr = respons.results.map(async obj => {
    const year = obj.release_date?.split('-').slice(0, 1).join('') || '';

    const newRespons = await genreObj;
    let genre;

    let screen;

    if (windowWidth < 768) {
      screen = {
        mob: true,
        tab: false,
        desc: false,
      };
    }
    if (windowWidth >= 768 && windowWidth < 1280) {
      screen = {
        mob: false,
        tab: true,
        desc: false,
      };
    }
    if (windowWidth >= 1280) {
      screen = {
        mob: false,
        tab: false,
        desc: true,
      };
    }

    if (obj.genre_ids.length === 0) {
      genre = ['No genres'];
    } else if (obj.genre_ids.length <= 2) {
      genre = obj.genre_ids.map(id => {
        return newRespons[id];
      });
    } else if (obj.genre_ids.length > 2) {
      const genres = obj.genre_ids.slice(0, 3).map(id => {
        return newRespons[id];
      });
      genres[2] = 'Other';
      genre = genres;
    }
    return {
      ...obj,
      year,
      genre,
      screen,
    };
  });
  Loading.remove();
  return await Promise.all(newArr);
};
/* конвертация данных для LIBRARRY */
const newDataId = async () => {
  Loading.circle();
  const respons = await api.idFetch();
  const year = respons.release_date?.split('-').slice(0, 1).join('') || '';
  const genres = respons.genres.map(obj => obj.name);

  let genre;

  let screen;

  if (windowWidth < 768) {
    screen = {
      mob: true,
      tab: false,
      desc: false,
    };
  }
  if (windowWidth >= 768 && windowWidth < 1280) {
    screen = {
      mob: false,
      tab: true,
      desc: false,
    };
  }
  if (windowWidth >= 1280) {
    screen = {
      mob: false,
      tab: false,
      desc: true,
    };
  }

  if (genres.length === 0) {
    genre = 'No genres';
  } else if (genres.length <= 2) {
    genre = genres.join(', ');
  } else if (genres.length > 2) {
    const genresN = genres.slice(0, 3);
    genresN[2] = 'Other';
    genre = genresN.join(', ');
  }

  const newArr = {
    ...respons,
    genre,
    year,
    screen,
  };
  Loading.remove();
  return newArr;
};
export { newDataTrand, newDataSearch, newDataId, api };
