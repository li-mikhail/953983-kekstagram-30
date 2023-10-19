import {randomArrayElement} from './util.js';
import {getRandomInteger} from './util.js';

const AVATAR_FILE_NUMBER = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

const AMOUNT_OF_DESCRIPTIONS = 25;

const COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTO_DESCTIOPTIONS = [
  'Закат на пляже',
  'Горы в облаках',
  'Цветущие вишневые деревья',
  'Городской пейзаж ночь',
  'Дети играют в парке',
  'Цветы на окне',
  'Парящий воздушный шар',
  'Разноцветные платья на показе мод',
  'Архитектурный ансамбль зданий',
  'Зимний лес с утренней инеем',
  'Уличное кафе с ароматом кофе',
  'Загадочный лесной путь',
  'Забавные животные в зоопарке',
  'Парящий лебедь на озере',
  'Искусство уличных граффити',
  'Стеклянные небоскребы в центре города',
  'Прибрежные скалы и море',
  'Рабочий на стройке',
  'Музыканты на уличном фестивале',
  'Загадочные руины старого замка',
  'Смешанные фрукты на рынке',
  'Снежный пик горы',
  'Круизный корабль в гавани',
  'Девушка с воздушными шарами',
  'Солнечные мельчайшие блики на воде',
];

const NAMES = [
  'Līga',
  'Jāni',
  'Inese',
  'Andris',
  'Zane',
  'Māris'
];

// Function for unique ID (closure)
function createID () {
  let lastCreatedID = 0;
  return function () {
    lastCreatedID += 1;
    return lastCreatedID;
  };
}

const generatePhotoID = createID ();
const generateCommentID = createID ();
const generatePhotoURL = createID ();

const createComment = () => ({
  commentID: generateCommentID(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_FILE_NUMBER)}.svg`,
  message: randomArrayElement(COMMENTS_TEXT),
  userName: randomArrayElement(NAMES),
});

const createDescription = () => ({
  id: generatePhotoID(),
  url: `photos/${generatePhotoURL()}.jpg`,
  description: randomArrayElement(PHOTO_DESCTIOPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, createComment),
});

const createPhotos = () => Array.from({length: AMOUNT_OF_DESCRIPTIONS}, createDescription);

export {createPhotos};
