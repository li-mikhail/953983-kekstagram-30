import { isEscapeKey } from './util';
const imageUploadForm = document.querySelector('.img-upload__form');

imageUploadForm.method = 'POST';
imageUploadForm.action = 'https://30.javascript.pages.academy/kekstagram';
imageUploadForm.type = 'multipart/form-data';

const editingForm = document.querySelector('.img-upload__overlay');
//const uploadNewPhotoButton = imageUploadForm.querySelector('.img-upload__label');
const bodyElement = document.querySelector('body');
const closeEditingFormButton = imageUploadForm.querySelector('.img-upload__cancel');
const imageUploadInput = document.querySelector('.img-upload__input');
const hashTagfield = imageUploadForm.querySelector('.text__hashtags');
const commentfield = imageUploadForm.querySelector('.text__description');

const pristine = new Pristine(imageUploadForm, {
  classto: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper', // почему можно не указывать errorTextTag?
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
  pristine.reset(); // как это работает? Удаляет слушатель?
  editingForm.reset(); // как это работает? Удаляет слушатель?
  imageUploadInput.value = ''; // в разметке нет аттрибута value, какой смысл в этом действии? Это действие вообще нужно, если есть предыдущая строка?
};

const isTextFieldOnFocus = () =>
  document.activeElement === hashTagfield || document.activeElement === commentfield;

function onDocumentKeydown (evt) { // почему нужно объявлять деклоративную функцию?
  if(isEscapeKey(evt) && !isTextFieldOnFocus()) {
    evt.preventDefault();
    hideEditingForm();
  }
}

const onClosePictureFormButtonClick = () => { // зачем нужна отдельная функция?
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
  .filter((tag) => Boolean(tag.length)); //почему строки пустые -> '', а не с пробелом внутри -> ' '?

const validateHashTagsPattern = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashTagsUniqueness = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

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

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

imageUploadInput.addEventListener('change', onFileInputChange);
closeEditingFormButton.addEventListener('click', onClosePictureFormButtonClick);

