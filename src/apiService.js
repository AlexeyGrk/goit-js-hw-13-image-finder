const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21657672-6f26057767faea3bb550eec99';

export default class PictureApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchPictureByWord() {
    try {
      const response =
        await fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}
`);
      const data = await response.json();
      const dataList = await data.hits;
      this.incrementPage();

      return dataList;
    } catch {}
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
