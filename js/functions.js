/* eslint-disable no-unused-vars */
function checkLength(string, numberOfSymbols) {
  return string.length <= numberOfSymbols;
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

function toNumber(string) {
  if (typeof string !== 'string') {
    string = string.toString();
  }

  let resultSrting = '';
  for (let i = 0; i <= string.length - 1; i++) {
    const symbol = parseInt(string[i]);

    if(!Number.isNaN(symbol) && symbol !== ' ') {
      resultSrting += symbol.toString();
    }
  }
  return resultSrting ? resultSrting : NaN;
}

//console.log(toNumber(22));
