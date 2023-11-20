const REMOVE_MESSAGE_TIMEOUT = 5000;
const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, showErrorMessage };

