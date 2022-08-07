import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(onUserInput, DEBOUNCE_DELAY));

function onUserInput(evt) {
  const searchInputValue = evt.target.value.trim();
  clearSearchResults();

  if (searchInputValue === '') {
    clearSearchResults();
    return;
  }

  fetchCountries(searchInputValue)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (countries.length === 1) {
        appentCountryMarkup(countries);
        return;
      }
      appentCountriesMarkup(countries);
    })
    .catch(() => Notify.failure('Oops, there is no country with that name'));
}

function appentCountryMarkup(countries) {
  const countryMarkup = `<ul class="country-list list">
  <li class="country-list__item"><img class="flag" src="${
    countries[0].flags.svg
  }" alt="${countries[0].name}"><h1>${countries[0].name}</h1></li>
  <li class="country-list__item"><b>Capital:</b>&nbsp;${
    countries[0].capital
  }</li>
  <li class="country-list__item"><b>Population:</b>&nbsp;${
    countries[0].population
  }</li>
  <li class="country-list__item"><b>Lenguages:</b>&nbsp;${countries[0].languages
    .map(language => language.name)
    .join(', ')}</li>
</ul>`;
  countryInfo.innerHTML = countryMarkup;
}

function appentCountriesMarkup(countries) {
  const countriesListMarkup = countries
    .map(
      country =>
        `<li class="country-list__item">
              <img class="flag" src="${country.flags.svg}" alt="${country.name}">
              <h3>${country.name}</h3>
          </li>`
    )
    .join('');
  countryList.innerHTML = countriesListMarkup;
}

function clearSearchResults() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
