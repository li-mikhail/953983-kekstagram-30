import {createPhotos} from './data.js';
import {renderGallery} from './gallery.js';

const photos = createPhotos(25);
renderGallery(photos);

// console.log(createPhotos(25));
import './validation.js';
