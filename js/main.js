import {createPhotos} from './data.js';
import {renderGallery} from './gallery.js';

const photos = createPhotos(25);
renderGallery(photos);

import './validation.js';
