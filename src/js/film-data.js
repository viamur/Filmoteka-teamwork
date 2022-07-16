export {
  dataCombine,
  createGenresList,
  createYear,
  getGenres,
  creatArrIdForGenges,
};

const allGenres = {};

/* Создание года релиза */
function createYear(obj) {
  return obj.release_date ? obj.release_date.split('-')[0] : '';
}

/* Создание списка жанров по id  */
function creatArrIdForGenges(array) {
  return array.genres
    .map(genre => genre.name)
    .slice(0, 3)
    .flat();
}

/* Создание списка жанров */
function createGenresList(array, genres) {
  return array
    .map(id => genres.filter(element => element.id === id))
    .slice(0, 2)
    .flat();
}

/* Извлечение всех жанров из обьека json файла который приходит с сервера в localStorage*/
function getGenres() {
  const { genres } = allGenres;
  return genres;
}

/* Жанры + год для фильмов */
function dataCombine(films, allGenres) {
  return films.map(film => ({
    ...film,
    year: createYear(film),
    genres: createGenresFromTrend(film.genre_ids, allGenres),
  }));
}
