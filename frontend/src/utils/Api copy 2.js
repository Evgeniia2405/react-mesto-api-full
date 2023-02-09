class Api {
  #url;
  #header;

  constructor(config) {
    this.#url = config.url;
    this.#header = config.headers;
  }

  #checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(response.status));
  }

  getUserInfo() {
    return fetch(`${this.#url}/users/me`, {
      method: 'GET',
      headers: this.#header,
    }).then(this.#checkResponse); //Обратите внимание, что передается только ссылка на метод. Не нужно его вызывать. Он сам вызовется, так как в then нужно передавать именно функцию, а не вызов функции.
  }

  getInitialCards() {
    return fetch(`${this.#url}/cards`, {
      method: 'GET',
      headers: this.#header,
    }).then(this.#checkResponse);
  }

  editUserInfo(name, about) {
    return fetch(`${this.#url}/users/me`, {
      method: "PATCH",
      headers: this.#header,
      body: JSON.stringify({ name, about }),
    }).then(this.#checkResponse);
  }

  editUserAvatar(avatar) {
    return fetch(`${this.#url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.#header,
      body: JSON.stringify({ avatar }),
    }).then(this.#checkResponse);
  }

  createCard(name, link) {
    return fetch(`${this.#url}/cards`, {
      method: "POST",
      headers: this.#header,
      body: JSON.stringify({ name, link }),
    }).then(this.#checkResponse);
  }

  addLikeCard(cardId) {
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.#header,
    }).then(this.#checkResponse);
  }

  removeLikeCard(cardId) {
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.#header,
    }).then(this.#checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.#url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.#header,
    }).then(this.#checkResponse);
  }
}
const API_OPTIONS = {
  url: "https://api.mesto.evgenia2405.nomoredomainsclub.ru",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
};
const api = new Api(API_OPTIONS);

export default api;
