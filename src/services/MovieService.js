import axios from 'axios';

const API_KEY = '6fe31a171d64b7b3d7fded3aa562ebfd';

export class MovieService {
  getMovies(search, page) {
    const params = {
      query: search,
      api_key: API_KEY,
      page
    }
    return axios.get('https://api.themoviedb.org/3/search/movie', { params });
  }

}