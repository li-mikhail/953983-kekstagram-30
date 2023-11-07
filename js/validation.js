import { isEscapeKey } from './util';
const imageUploadForm = document.querySelector('.img-upload__form');

imageUploadForm.method = 'POST';
imageUploadForm.action = 'https://30.javascript.pages.academy/kekstagram';
imageUploadForm.type = 'multipart/form-data';

const editingForm = document.querySelector('.img-upload__overlay');
const uploadNewPhotoButton = imageUploadForm.querySelector('.img-upload__label');
const bodyElement = document.querySelector('body');
const closeEditingFormButton = imageUploadForm.querySelector('.img-upload__cancel');
const imageUploadInput = document.querySelector('.img-upload__input');

uploadNewPhotoButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  editingForm.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
});

const hideEditingForm = () => {
  editingForm.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imageUploadInput.value = ''; // в разметке нет аттрибута value, какой смысл в этом действии?
};

function onDocumentKeydown (evt) { // почему нужно объявлять деклоративную функцию?
  if(isEscapeKey) {
    evt.preventDefault();
    hideEditingForm();
  }
}

const onClosePictureFormButtonClick = () => { // зачем нужна отдельная функция?
  hideEditingForm();
};

// валидация ниже
const pristine = new Pristine(imageUploadForm, {

});

closeEditingFormButton.addEventListener('click', onClosePictureFormButtonClick);
