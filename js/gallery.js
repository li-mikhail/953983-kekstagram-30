import { renderThumbnails } from './thumbnail.js';
import { showPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

let firstRender = true;

const renderGallery = (pictures) => {
  if(firstRender) {
    container.addEventListener('click', (evt) => {
      const thumbnail = evt.target.closest('[data-thumbnail-id]'); //finds closet parent element by selector or in our case the element which has this attribute, if element not found we will get null
      if (! thumbnail) {
        return;
      }
      evt.preventDefault();

      const thumbnailId = +thumbnail.dataset.thumbnailId; //the data in dataset is a stroke, so we ahve to conver it to number
      const pictureData = pictures.find(({ id }) => id === thumbnailId); //find specific object which has the same attribute as a thumbnail user clicked

      showPicture(pictureData);
    });
    firstRender = false;
  }

  renderThumbnails(pictures, container);
};

export { renderGallery };
