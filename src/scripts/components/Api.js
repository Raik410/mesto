export class Api {
  constructor({ baseUrl,  headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _makeRequest(path, method, {...body}) {
    return fetch(this.baseUrl + path, {
      method: method || 'GET',
      headers: this.headers,
      ...body
    })
      .then(res => {
        if(res.ok) { return res.json() }

        return Promise.reject(res.status);
      })
  };

  getProfile() {
    return this._makeRequest('/users/me')
  }

  getInitialCards() {
    return this._makeRequest('/cards')
  }

  editProfile(name, about) {
    return this._makeRequest('/users/me', "PATCH", {
      body: JSON.stringify({
      name: name,
      about: about,
    })
  })
  }

  addCard(name, link) {
    return this._makeRequest('/cards', "POST", {
      body: JSON.stringify({
      name: name,
      link: link,
    })
  })
  }

  deleteCard(id) {
    return this._makeRequest(`/cards/${id}`, "DELETE")
  }

  deleteLike(id) {
    return this._makeRequest(`/cards/${id}/likes`, "DELETE")
  }

  addLike(id) {
    return this._makeRequest(`/cards/${id}/likes`, "PUT")
  }

  resetAvatar(avatarPhoto) {
    return this._makeRequest('/users/me/avatar', "PATCH", {
      body: JSON.stringify({
      avatar: avatarPhoto,
    })
  })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'edcdf9ce-a80f-4960-87f2-b6b93e17bf9b',
    'Content-Type': 'application/json'
  }
});
