import './sass/main.scss';
import debounce from 'lodash.debounce';
import cardTpm from './templates/cardTmp';
import cardListCountryTpm from './templates/cardListTmp';
import fetchCountryByName from './fetchCountries.js';
import './pnotify-cfg';
import { error } from '@pnotify/core';

const refs = {
  inputnRef: document.querySelector('.input-country-js'),
  searchForm: document.querySelector('.js-searchForm'),
  cardList: document.querySelector('.js-cardLand'),
};

function renderCountryCardList(countres) {
  const markup = cardListCountryTpm(countres);
  refs.cardList.insertAdjacentHTML('beforeend', markup);
}
function renderCountryCard(country) {
  const markup = cardTpm(country);
  refs.cardList.insertAdjacentHTML('beforeend', markup);
}
async function onSearch(e) {
  e.preventDefault();
  clearMarkup();

  const searchQuery = refs.searchForm.elements.query.value;
  fetchCountryByName(searchQuery).then(succesCountry).catch().finally(clearMarkup());
}
function succesCountry(data) {
  if (data.length === 1) {
    renderCountryCard(...data);
    refs.inputnRef.value = '';
    return;
  }
  if (data.length >= 2 && data.length <= 10) {
    renderCountryCardList(data);
    return;
  }

  landError();
  clearMarkup();
  return;
}
refs.inputnRef.addEventListener('input', debounce(onSearch, 500));

function landError() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
  });
}

function clearMarkup() {
  refs.cardList.innerHTML = '';
}
