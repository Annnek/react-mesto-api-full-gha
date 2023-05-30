class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl; //адрес сервера
    this._headers = config.headers; //заголовки запроса
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
  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  // Метод загрузки карточек с сервера
  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  // Метод редактирование профиля
  async setUserInfo(data) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._handleSendingRequest(response);
  }

  // Метод обновления аватара пользователя
  async setUserAvatar(data) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      }),
    });
    return this._handleSendingRequest(response);
  }

  // Метод добавления новой карточки с сервера
  async addNewCard(data) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._handleSendingRequest(response);
  }

  // Метод постановки лайка карточки
  async changeLikeCardStatus(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  //метод удаления лайка карточки
  async deleteLikeStatus(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  // Метод удаления карточки
  async deleteOwnerCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "332cdff8-dddc-4d5c-ae62-82417a8b0fdc",
    "Content-Type": "application/json",
  },
});

export default api;
