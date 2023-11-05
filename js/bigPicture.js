const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButton = bigPictureElement.querySelector('.big-picture__cancel');

const COMMENTS_COUNT_SHOWN = 5;
let commentsCountShown = 0;
let comments = [];

const commentElement = document
  .querySelector('#comment')
  .content
  .querySelector('.social__comment');

const commentCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsloaderElement = bigPictureElement.querySelector('.comments-loader');

const commentListElement = bigPictureElement.querySelector('.social__comments');

const createComment = ({ avatar, message, userName }) => {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = userName;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;

};

const renderComments = () => {
  commentsCountShown += COMMENTS_COUNT_SHOWN;

  if (commentsCountShown >= comments.length) {
    commentsloaderElement.classList.add('hidden');
    commentsCountShown = comments.length;
  } else {
    commentsloaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentListElement.innerHTML = '';

  commentListElement.append(fragment);

  commentCountElement.textContent = commentsCountShown;
  commentTotalCountElement.textContent = comments.length;
};

const onCommentsLoaderClick = () => renderComments();

const renderPicture = ({ url, description, likes }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showPicture = (pictureData) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', OnDocumentKeydown);

  comments = pictureData.comments;
  if (comments.length > 0) {
    renderComments(comments);
  }

  renderPicture(pictureData);
};

const hidePicture = () => {
  bodyElement.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');

  document.removeEventListener('keydown', OnDocumentKeydown);

  commentsCountShown = 0;
};

const onClosePictureButtonClick = () => {
  hidePicture();
};

function OnDocumentKeydown (evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    hidePicture();
  }
}

closePictureButton.addEventListener('click', onClosePictureButtonClick);

commentsloaderElement.addEventListener('click', onCommentsLoaderClick);

export { showPicture };
