import './sass/main.scss';
import pictureLists from './templates/pictureLists.hbs';
import './pnotify-cfg';
import { error } from '@pnotify/core';
import PictureApiService from './apiService.js';

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  findInput: document.querySelector('.input-picture-js'),
  findBtn: document.querySelector('.find-btn'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  buttonUp: document.querySelector('.button-up'),
};

const PirctureApiService = new PictureApiService();

refs.findBtn.addEventListener('click', searchPictures);
refs.loadMoreBtn.addEventListener('click', OnLoadMore);
refs.buttonUp.addEventListener('click', buttonOnUp);

function searchPictures(e) {
  e.preventDefault();

  showLoadMoreBtn();

  PirctureApiService.resetPage();
  clearPicturesContiner();

  PirctureApiService.query = refs.findInput.value;
  if (PirctureApiService.query === '') {
    findError();
    return;
  }

  refs.findInput.value = '';
  PirctureApiService.fetchPictureByWord().then(renderPicturesGallery).catch(findError);
}
function renderPicturesGallery(pictures) {
  const markup = pictureLists(pictures);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
function clearPicturesContiner() {
  refs.gallery.innerHTML = '';
}
function OnLoadMore() {
  PirctureApiService.fetchPictureByWord().then(renderPicturesGallery).catch(findError);
}
function buttonOnUp() {
  window.scrollTo({
    top: 0,
    left: 100,
    behavior: 'smooth',
  });
}
function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
function findError() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
  });
}
function resetSearchQuery() {}
