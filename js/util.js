//  Random integer from range
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Random element from array
const randomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export {randomArrayElement};
export {getRandomInteger};
