import fetchImages from './fetchImages.js';
import notify from './notify.js';

import { refs } from './refs.js';
import imagesPX from '../templates/images.hbs';
// import countryTen from '../templates/country-ten.hbs';

const debounce = require('lodash.debounce');

let imgSearch;

refs.inputImage.addEventListener('input', debounce(getInfoAboutImage, 500));

function getInfoAboutImage() {
  imgSearch = refs.inputImage.value;
  fetchImages(imgSearch, 1)
    .then(renderImages)
    .catch(message => notify(message));
}

function renderImages(images) {
  const markup = imagesPX(images);
  console.dir(markup);
  refs.descrImage.innerHTML = markup;
}
