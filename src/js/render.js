import notify from './notify.js';
import NewApiService from '../templates/NewApiService';
import { refs } from './refs.js';
import imagesPX from '../templates/images.hbs';
import LoadMoreBtn from '../components/load-more-btn';
// для работы модального окна
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

const availableScreenHeight = window.screen.availHeight;
let checkScroll = false;
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newApiService = new NewApiService();

function ulGalleryClick(evt) {
  const isGallery__image = evt.target.classList.contains('js-images');
  if (!isGallery__image) {
    return;
  }
  const instance = basicLightbox.create(`
    <img src = ${evt.target.dataset.source} width="800" height="600">
`);
  instance.show();
  // refs.imglightbox.src = evt.target.dataset.source;
}
//Открытие модального окна по клику на элементе галереи
refs.ulGallery.addEventListener('click', ulGalleryClick);

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  newApiService.query = e.currentTarget.elements.query.value;
  if (newApiService.query != '') {
    loadMoreBtn.show();
    loadMoreBtn.disable();
  }
  newApiService.resetPage();
  newApiService
    .fetchImg()
    .then(hits => {
      clearImagesContainer();
      AppendImagesMarkup(hits);
      loadMoreBtn.enable();
    })
    .catch(message => notify(message));
  loadMoreBtn.refs.hidden = false;
}
function onLoadMore() {
  newApiService
    .fetchImg()
    .then(hits => {
      AppendImagesMarkup(hits);
      scrollToHaddler();
    })
    .catch(message => notify(message));
}

function AppendImagesMarkup(hits) {
  refs.descrImage.insertAdjacentHTML('beforeend', imagesPX(hits));
}

function clearImagesContainer() {
  refs.descrImage.innerHTML = '';
}
function scrollToHaddler() {
  window.scrollTo({
    top: availableScreenHeight * newApiService.pageNumber,
    behavior: 'smooth',
  });
}
const sentinel = document.querySelector('#sentinel');
const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newApiService.query !== '' && checkScroll) {
      // console.log('Пора грузить еще статьи' + Date.now());
      newApiService.fetchImg().then(hits => {
        AppendImagesMarkup(hits);
        newApiService.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
refs.infCheckScroll.addEventListener('change', function () {
  if (refs.infCheckScroll.checked) {
    observer.observe(sentinel);
    checkScroll = true;
  } else {
    checkScroll = false;
  }
});
