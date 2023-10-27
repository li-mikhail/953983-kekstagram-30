
import { initCommentList, renderComments } from './comment.js';
const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButton = bigPictureElement.querySelector('.big-picture__cancel');

const renderPicture = ({ url, description, likes }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showPicture = (pictureData) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', OnDocumentKeydown);
  renderComments(pictureData.comments);
  initCommentList();
  renderPicture(pictureData);
};

const hidePicture = () => {
  bodyElement.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');

  document.removeEventListener('keydown', OnDocumentKeydown);
};

const onClosePictureButtonClick = () => {
  hidePicture();
};

function OnDocumentKeydown (evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    hidePicture();
  }
}

closePictureButton.addEventListener('click', onClosePictureButtonClick);

export { showPicture };
