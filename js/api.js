const SERVER_URL = 'https://30.javascript.htmlacademy.pro/kekstagram/data';


const serverRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const httpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const errorText = {
  GET: 'Не удалось загрузить данные. Попробуйте еще раз.',
  POST: 'Не удалось отправить данные формы',
};

const request = async (url, method = httpMethod.GET, body = null) => {
  const response = await fetch(url, {method, body}); // как работает await и async? Что-то поменяется, если не испольпользовать это?
  if(!response.ok) {
    throw new Error(errorText[method]);
  }
  return response.json();
};

const loadPictures = async () => request(SERVER_URL + serverRoute.GET_DATA);

const sendPictures = async (pictureData) => request(SERVER_URL + serverRoute.SEND_DATA, httpMethod.POST, pictureData);

export { loadPictures, sendPictures };
