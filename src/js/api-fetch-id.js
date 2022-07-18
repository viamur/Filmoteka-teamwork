import axios from 'axios';

export class ApiFetchId {
  #BASE_URL = 'https://api.themoviedb.org/3/';
  #API_KEY = '0a4aab5daca4d3b8b09b771948ad9265';
  #SEARCH = 'search/movie';
  #SEEID = 'movie/';
  #TRAND = 'trending/movie/day';
  #GENRE = 'genre/movie/list';

  constructor() {
    this.totalPages = 0;
    this.page = 1;
    this.query = null;
    this.id = 0;
    this.totalItems = 0;
  }

  /* Запрос возвращает ОБЪЕКТ с подробной информ о фильме поиск по ID */
  async idFetch() {
    const respons = await axios.get(
      `${this.#BASE_URL}${this.#SEEID}${this.id}?api_key=${this.#API_KEY}`
    );
    return respons.data;
  }

  /* Запрос возвращает массив из объектами, фильмов которые через ИНПУТ делаем ЗАПРОС */
  async searchFetch() {
    const search = new URLSearchParams({
      api_key: this.#API_KEY,
      query: this.query,
      page: this.page,
    });
    try {
      const respons = await axios.get(
        `${this.#BASE_URL}${this.#SEARCH}?${search}`
      );

      this.totalPages = respons.data.total_pages;
      this.totalItems = respons.data.total_results;

      return respons.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  /* Запрос возвращает массив из объектами, ТРЕНДОВЫХ фильмов(можно листасть их стр)*/
  async trandFetch() {
    try {
      const respons = await axios.get(
        `${this.#BASE_URL}${this.#TRAND}?api_key=${this.#API_KEY}&page=${
          this.page
        }`
      );
      this.totalItems = respons.data.total_results;
      this.totalPages = respons.data.total_pages;
      return respons.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  /* Запрос возвращает массив 19шт, id и name, ЖАНРОВ фильмов */
  async genreListFetch() {
    try {
      const respons = await axios.get(
        `${this.#BASE_URL}${this.#GENRE}?api_key=${this.#API_KEY}`
      );
      return respons.data.genres;
    } catch (error) {
      console.log(error.message);
    }
  }
}
