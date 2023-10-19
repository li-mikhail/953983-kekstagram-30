function countDuration (hoursStart, minStart, hoursFinish, minFinish) {
  return (hoursFinish * 60 + minFinish) - (hoursStart * 60 + minStart);
}

function isEnoughtTime (timeStartWork, timeFinishWork, timeMeetingStarts, meetingDuration) {
  //массивы со строками часов[0] и минут[1]
  const timeStartWorkArray = timeStartWork.split(':');
  const timeFinishArray = timeFinishWork.split(':');
  const timeMeetingArray = timeMeetingStarts.split(':');

  //часы и минуты начала дня в int
  const timeStartHour = parseInt(timeStartWorkArray[0], 10);
  //const timeStartMin = parseInt(timeStartWorkArray[1], 10);

  //часы и минуты конца дня в int
  const timeFinishHour = parseInt(timeFinishArray[0], 10);
  const timeFinishMin = parseInt(timeFinishArray[1], 10);

  //часы и минуты начала встречи в int
  const timeMeetingHour = parseInt(timeMeetingArray[0], 10);
  const timeMeetingMin = parseInt(timeMeetingArray[1], 10);

  //проверка на случай, если встреча назначена до начала рабочего дня
  if(timeStartHour > timeMeetingHour) {
    return false;
  }

  //подсчет времени от начала встречи до конца рабочего дня и сравнение этой величены с длительностью встречи
  if(countDuration(timeMeetingHour, timeMeetingMin, timeFinishHour, timeFinishMin) > meetingDuration) {
    return true;
  } else {
    return false;
  }
}

isEnoughtTime();
/*console.log(isEnoughtTime('08:00', '17:30', '14:00', 90)); // true
console.log(isEnoughtTime('8:0', '10:0', '8:0', 120)); // true
console.log(isEnoughtTime('08:00', '14:30', '14:00', 90)); // false
console.log(isEnoughtTime('14:00', '17:30', '08:0', 90)); // false
console.log(isEnoughtTime('8:00', '17:30', '08:00', 900)); // false */
