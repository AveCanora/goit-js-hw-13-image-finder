import fetchCountries from './fetchCountries.js';
import notify from './notify.js';

import { refs } from './refs.js';
import countryOne from '../templates/country-one.hbs';
import countryTen from '../templates/country-ten.hbs';

const debounce = require('lodash.debounce');

let nameCountry;

refs.inputCountry.addEventListener('input', debounce(getNameOfCountry, 500));

function getNameOfCountry() {
  nameCountry = refs.inputCountry.value;
  fetchCountries(nameCountry)
    .then(renderCountry)
    .catch(message => notify(message));
}

function renderCountry(country) {
  //   const newCountry = country.filter(country => country.name.includes('Uk'));

  let numberCountries = country.length;

  if (numberCountries === 1) {
    const markup = countryOne(country);
    refs.descrCountry.innerHTML = markup;
  } else if (numberCountries <= 10) {
    const markup = countryTen(country);
    refs.descrCountry.innerHTML = markup;
  } else if (numberCountries > 10) {
    notify('To many matches found. Please \nenter a more specific query!');
  }
}
