/* eslint-disable no-unused-vars */
function checkLength(string, numberOfSymbols) {
  return string.length <= numberOfSymbols;
}

// function isPalyndrome(string) {
//   const prepWord = string.toLowerCase().replaceAll(' ', '');
//   let start = 0;
//   let end = prepWord.length - 1;

//   while (start < end) {
//     if (prepWord[start] !== prepWord[end]) {
//       return false;
//     }
//     start++;
//     end--;
//   }
//   return true;
// }

function isPalyndrome(rawString) {
  const string = rawString.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < string.length / 2; i++) {
    if (string.at(i) !== string.at(-i - 1)) {
      return false;
    }
  }
  return true;
}

// function toNumber(string) {
//   if (typeof string !== 'string') {
//     string = string.toString();
//   }

//   let resultSrting = '';
//   for (let i = 0; i <= string.length - 1; i++) {
//     const symbol = parseInt(string[i], 10);

//     if(!Number.isNaN(symbol) && symbol !== ' ') {
//       resultSrting += symbol.toString();
//     }
//   }
//   return resultSrting ? resultSrting : NaN;
// }

function toNumber(arg) {
  const string = arg.toString();

  let resultSrting = '';
  for (let i = 0; i < string.length; i++) {

    if(!Number.isNaN(parseInt(string[i], 10))) {
      resultSrting += string[i];
    }
  }
  return parseInt(resultSrting, 10);
}

//console.log(toNumber('22 vfwevwebv 33'));
