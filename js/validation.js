import { isEscapeKey } from './util.js';
import {
  init as initEffect,
  reset as resetEffect }
  from './effects.js';

import { resetScale } from './scale.js';
import { sendPictures } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_COUNT = 140;
const FILE_TYPES = ['jpeg', 'jpg', 'png'];

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ERROR_TEXT_HASHTAG = {
  INVALID_COUNT: `Maximum ${MAX_HASHTAG_COUNT} hashtags reached`,
  NOT_UNIQUE: 'Hashtags must be unique',
  INVALID_PATTERN: 'Invalid hashtag',
};

const ERROR_TEXT_COMMENT = {
  INVALID_COUNT: `Maximum ${MAX_COMMENT_COUNT} amount of symbols reached`
};

const SubmitButtonCaption = {
  SUBMITTING: 'Sending',
  IDLE: 'Publish',
};

const imageUploadForm = document.querySelector('.img-upload__form');
const editingForm = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const closeEditingFormButton = imageUploadForm.querySelector('.img-upload__cancel');
const imageUploadInput = document.querySelector('.img-upload__input');
const hashTagfield = imageUploadForm.querySelector('.text__hashtags');
const commentfield = imageUploadForm.querySelector('.text__description');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const fileField = imageUploadForm.querySelector('.img-upload__input');
const photoPreview = imageUploadForm.querySelector('.img-upload__preview img');
const imageEffectsPreviews = imageUploadForm.querySelectorAll('.effects__preview');

imageUploadForm.method = 'POST';
imageUploadForm.action = 'https://30.javascript.pages.academy/kekstagram';
imageUploadForm.type = 'multipart/form-data';

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonCaption.SUBMITTING : SubmitButtonCaption.IDLE;
};

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

const isValidFile = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
};

const onFileInputChange = () => {
  const file = fileField.files[0];
  if(file && isValidFile(file)) {
    photoPreview.src = URL.createObjectURL(file);
    imageEffectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
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
  const isErrorMessageExits = Boolean(document.querySelector('.error'));
  if(isEscapeKey(evt) && !isTextFieldOnFocus() && !isErrorMessageExits) {
    evt.preventDefault();
    hideEditingForm();
  }
}

const onClosePictureFormButtonClick = () => {
  hideEditingForm();
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

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  if (! pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPictures(new FormData(evt.target)); //почему передаем параметром evt.target?
    hideEditingForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    toggleSubmitButton(false);
  }
};

imageUploadInput.addEventListener('change', onFileInputChange);
closeEditingFormButton.addEventListener('click', onClosePictureFormButtonClick);
imageUploadForm.addEventListener('submit', onFormSubmit);
initEffect();
