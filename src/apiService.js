const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21657672-6f26057767faea3bb550eec99';

export default async function fetchPictureByWord(searchQuery) {
  try {
    const response =
      await fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12&key=${API_KEY}
`);
    const data = await response.json();
    const dataList = await data.hits;
    return dataList;
  } catch {}
}
