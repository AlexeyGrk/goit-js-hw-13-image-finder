import './sass/main.scss';
import fetchPictureByWord from './apiService.js';
import pictureLists from './templates/pictureLists.hbs';
import './pnotify-cfg';
import { error } from '@pnotify/core';

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  findInput: document.querySelector('.input-picture-js'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

refs.loadMoreBtn.addEventListener('click', searchPictures);

function searchPictures(e) {
  e.preventDefault();
  const inputValue = refs.findInput.value;
  fetchPictureByWord(inputValue).then(renderPicturesGallery);
}
function renderPicturesGallery(pictures) {
  const markup = pictureLists(pictures);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
