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
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/users/me`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.#checkResponse); //Обратите внимание, что передается только ссылка на метод. Не нужно его вызывать. Он сам вызовется, так как в then нужно передавать именно функцию, а не вызов функции.
  }

  getInitialCards() {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/cards`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.#checkResponse);
  }

  editUserInfo(name, about) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ name, about }),
    }).then(this.#checkResponse);
  }

  editUserAvatar(avatar) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ avatar }),
    }).then(this.#checkResponse);
  }

  createCard(name, link) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/cards`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ name, link }),
    }).then(this.#checkResponse);
  }

  addLikeCard(cardId) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.#checkResponse);
  }

  removeLikeCard(cardId) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.#checkResponse);
  }

  deleteCard(cardId) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.#checkResponse);
  }
}
const API_OPTIONS = {
  url: "https://api.mesto.evgenia2405.nomoredomainsclub.ru",
  headers: {
    'Content-Type': 'application/json',
  },
};
const api = new Api(API_OPTIONS);

export default api;
