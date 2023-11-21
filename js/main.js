import { renderGallery } from './gallery.js';
import './validation.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './util.js';

async function bootstrap() {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
  } catch (error) {
    showErrorMessage();
  }
}

bootstrap();
