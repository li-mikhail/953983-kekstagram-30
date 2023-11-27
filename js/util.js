const REMOVE_MESSAGE_TIMEOUT = 5000;
const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, showErrorMessage, debounce };

