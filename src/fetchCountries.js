const BASE_URL = 'https://restcountries.com';
const options = `fields=name,capital,population,flags,languages`;

function fetchCountries(name) {
  const url = `${BASE_URL}/v2/name/${name}?${options}`;

  return fetch(url)
    .then(response => response.json())
    .then(countries => {
      return countries;
    });
}

export { fetchCountries };
