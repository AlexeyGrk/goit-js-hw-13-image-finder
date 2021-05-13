export default function fetchCountryByName(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(r => {
    return r.json();
  });
}
