const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const modalForm = document.querySelector('.img-upload');
const scaleInputElement = modalForm.querySelector('.scale__control--value');
const scaleControlSmaller = modalForm.querySelector('.scale__control--smaller');
const scaleControlBigger = modalForm.querySelector('.scale__control--bigger');
const imageElement = modalForm.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const onSmallButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleInputElement.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onBigButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleInputElement.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

scaleControlSmaller.addEventListener('click', onSmallButtonClick);
scaleControlBigger.addEventListener('click', onBigButtonClick);

export { resetScale };
