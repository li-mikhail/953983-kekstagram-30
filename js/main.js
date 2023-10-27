import {createPhotos} from './data.js';
import {renderThumbnails} from './thumbnail.js';

const photos = createPhotos(25);
renderThumbnails(photos);

// console.log(createPhotos(25));
