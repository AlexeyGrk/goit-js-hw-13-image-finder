import './sass/main.scss';
import fetchPictureByWord from './apiService.js';
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
};

const PirctureApiService = new PictureApiService();

refs.findBtn.addEventListener('click', searchPictures);
refs.loadMoreBtn.addEventListener('click', OnLoadMore);

function searchPictures(e) {
  e.preventDefault();

  PirctureApiService.resetPage();
  clearPicturesContiner();

  PirctureApiService.query = refs.findInput.value;
  if (PirctureApiService.query === '') {
    return;
  }
  PirctureApiService.fetchPictureByWord().then(renderPicturesGallery);
}
function renderPicturesGallery(pictures) {
  const markup = pictureLists(pictures);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
function clearPicturesContiner() {
  refs.gallery.innerHTML = '';
}
function OnLoadMore() {
  PirctureApiService.fetchPictureByWord().then(renderPicturesGallery);
  // window.scrollTo({ left: 0, top:  behavior: "smooth" });
  gotoBottom('.load-more-btn');
}
