class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl; //адрес сервера
    // this._headers = config.headers; //заголовки запроса
  }

  // Формирую запрос на сервер, если прошел не удачно, возвращаем ошибку!
  _handleSendingRequest(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }

    // Если ошибка пришла, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Метод загрузки информации о пользователе с сервера
  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleSendingRequest);
  }

  // Метод загрузки карточек с сервера
  getInitialCards() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleSendingRequest);
  }

  // Метод редактирование профиля
  setUserInfo(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleSendingRequest);
  }

  // Метод обновления аватара пользователя
  setUserAvatar(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data,
      }),
    }).then(this._handleSendingRequest);
  }

  // Метод добавления новой карточки с сервера
  addNewCard(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(this._handleSendingRequest);
  }

  // Метод постановки лайка карточки
  changeLikeCardStatus(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleSendingRequest);
  }

  //метод удаления лайка карточки
  deleteLikeStatus(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleSendingRequest);
  }

  // Метод удаления карточки
  deleteOwnerCard(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleSendingRequest);
  }
}

export const api = new Api({
  baseUrl: "https://api.annnek.nomoredomains.rocks",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default api;
