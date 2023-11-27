import { isEscapeKey } from './util.js';

const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const existingElement = document.querySelector('.success') || document.querySelector('.error');
  existingElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

const onCloseButtonClick = () => {
  hideMessage();
};

function onDocumentKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }

  hideMessage();
}

const showMessage = (element, buttonCLass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  element.querySelector(buttonCLass).addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  showMessage(successMessageElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageElement, '.error__button');
};

export { showErrorMessage, showSuccessMessage };
