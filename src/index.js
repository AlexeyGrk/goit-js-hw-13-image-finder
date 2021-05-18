import './sass/main.scss';
import pictureLists from './templates/pictureLists.hbs';
import './pnotify-cfg';
import { error } from '@pnotify/core';
import PictureApiService from './apiService.js';
import InfinityScrollFn from 'infinite-scroll';

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  findInput: document.querySelector('.input-picture-js'),
  findBtn: document.querySelector('.find-btn'),

  buttonUp: document.querySelector('.button-up'),
};

const PirctureApiService = new PictureApiService();

refs.findBtn.addEventListener('click', searchPictures);

refs.buttonUp.addEventListener('click', buttonOnUp);
window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    OnLoadMore();
  }
});

function searchPictures(e) {
  e.preventDefault();

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
  if (PirctureApiService.query === '') {
    findError();
    return;
  }
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

function findError() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
  });
}
