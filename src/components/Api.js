// Создать класс Api
// Все запросы должны быть методами этого класса
export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }
  // Проверить, всё ли в порядке с ответом
  // Использовать res.ok/res.status
  _getRes(res) {
    if (res.ok) {
      return res.json();
    }
    // Отклонить промис, если сервер вернул ошибку
    return Promise.reject(`Ошибка HTTP: ${res.status}`);
  }

  getProfileData() {
    // GET https://nomoreparties.co/v1/cohortId/users/me
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then(this._getRes);
  }

  getInitialCards() {
    // GET https://mesto.nomoreparties.co/v1/cohortId/cards
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then(this._getRes);
  }

  getInitialData() {
    return Promise.all([this.getProfileData(), this.getInitialCards()])
  }

  editProfileAvatar(data) {
    // PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getRes);
  }

  editProfileInfo(data) {
    // PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getRes);
  }

  addCard(data) {
    // POST https://mesto.nomoreparties.co/v1/cohortId/cards
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getRes);
  }

  deleteCard(id) {
    //DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._getRes);
  }

  addLike(id) {
    //PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getRes);
  }

  deleteLike(id) {
    // DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getRes);
  }
}

//За отправкой запросов следить через вкладку Network.
//Отфильтровать в ней XHR запросы.
//Это позволит оперативно следить, что приходит в ответе от сервера.
