import axios from 'axios';
export class ApiFetchId {
  #BASE_URL = 'https://api.themoviedb.org/3/movie/';
  #API_KEY = '0a4aab5daca4d3b8b09b771948ad9265';

  constructor() {}

  async apiFetchId(id) {
    try {
      const respons = await axios.get(`${this.#BASE_URL}${id}?api_key=${this.#API_KEY}`);
      return respons.data;
    } catch (error) {
      console.log(error);
    }
  }
}
