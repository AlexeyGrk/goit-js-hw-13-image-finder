export default async function fetchCountryByName(searchQuery) {
  try {
    const data = await fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`);
    const response = await data.json();
    return response;
  } catch {}
}
