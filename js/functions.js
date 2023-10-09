/* eslint-disable no-unused-vars */
function checkLength(string, numberOfSymbols) {
  const result = string.length <= numberOfSymbols;
  return result;
}

function isPalyndrome(string) {
  const prepWord = string.toLowerCase().replaceAll(' ', '');
  let start = 0;
  let end = prepWord.length - 1;

  while (start < end) {
    if (prepWord[start] !== prepWord[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

// работет некорректно
/*
function toNumber(string) {
  let result = [];
  let resultSrting = '';
  for (let i = 0; i <= string.length - 1; i++) {
    const symbol = parseInt(string[i]);

    if(!Number.isNaN(symbol)) {
      result[i] = symbol.toString();
    }
  }

  return resultSrting;
}
*/
