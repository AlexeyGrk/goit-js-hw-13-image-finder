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
      this.page += 1;
      console.log(dataList);
      return dataList;
    } catch {}
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
// function fetchPictureByWord() {
//   fetch(
//     `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
//   )
//     .then(r => r.json())
//     .then(data => data.hits);
// }
