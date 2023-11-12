import { isEscapeKey } from './util.js';
import {
  init as initEffect,
  reset as resetEffect }
  from './effects.js';

import { resetScale } from './scale.js';

const imageUploadForm = document.querySelector('.img-upload__form');

imageUploadForm.method = 'POST';
imageUploadForm.action = 'https://30.javascript.pages.academy/kekstagram';
imageUploadForm.type = 'multipart/form-data';

const editingForm = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const closeEditingFormButton = imageUploadForm.querySelector('.img-upload__cancel');
const imageUploadInput = document.querySelector('.img-upload__input');
const hashTagfield = imageUploadForm.querySelector('.text__hashtags');
const commentfield = imageUploadForm.querySelector('.text__description');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, true);

const showEditingForm = () => {
  editingForm.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onFileInputChange = () => {
  showEditingForm();
};

const hideEditingForm = () => {
  editingForm.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetScale();
  pristine.reset();
  imageUploadForm.reset();
  imageUploadInput.value = '';
  resetEffect();
};

const isTextFieldOnFocus = () =>
  document.activeElement === hashTagfield || document.activeElement === commentfield;

function onDocumentKeydown (evt) {
  if(isEscapeKey(evt) && !isTextFieldOnFocus()) {
    evt.preventDefault();
    hideEditingForm();
  }
}

const onClosePictureFormButtonClick = () => {
  hideEditingForm();
};

// валидация ниже

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_TEXT_HASHTAG = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const MAX_COMMENT_COUNT = 140;
const ERROR_TEXT_COMMENT = {
  INVALID_COUNT: `Максимум ${MAX_COMMENT_COUNT} комментариев`
};

const normalizeTags = (string) => string
  .trim(' ')
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const validateHashTagsUniqueness = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashTagsPattern = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const validateHashTagsCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

pristine.addValidator(
  hashTagfield,
  validateHashTagsPattern,
  ERROR_TEXT_HASHTAG.INVALID_PATTERN,
  1,
  true
);

pristine.addValidator(
  hashTagfield,
  validateHashTagsUniqueness,
  ERROR_TEXT_HASHTAG.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  hashTagfield,
  validateHashTagsCount,
  ERROR_TEXT_HASHTAG.INVALID_COUNT,
  3,
  true
);

const validateCommentLength = (value) => value.length <= MAX_COMMENT_COUNT;

pristine.addValidator(
  commentfield,
  validateCommentLength,
  ERROR_TEXT_COMMENT.INVALID_COUNT
);

const onFormSubmit = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};


imageUploadInput.addEventListener('change', onFileInputChange);
closeEditingFormButton.addEventListener('click', onClosePictureFormButtonClick);
imageUploadForm.addEventListener('click', onFormSubmit);
initEffect();
