const commentElement = document
  .querySelector('#comment')
  .content
  .querySelector('.social__comment');

const bigPictureElement = document.querySelector('.big-picture');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
//const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsloaderElement = bigPictureElement.querySelector('.comments-loader');

const commentListElement = bigPictureElement.querySelector('.social__comments');

const createComment = ({ avatar, message, userName }) => {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = userName;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;

};

const renderComments = (comments) => {
  commentListElement.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((element) => {
    const comment = createComment(element);
    fragment.append(comment);
  });

  commentListElement.append(fragment);
};

const initCommentList = () => {
  commentCountElement.classList.add('hidden');
  commentsloaderElement.classList.add('hidden');
};

export { renderComments, initCommentList };
