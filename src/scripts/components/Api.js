export class Api {
  constructor({ baseUrl,  headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getProfile() {
    return fetch(`${this.baseUrl}/users/me` , {
      headers: this.headers
    }).then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards` , {
      headers: this.headers
    }).then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  editProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me` , {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards` , {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'edcdf9ce-a80f-4960-87f2-b6b93e17bf9b',
    'Content-Type': 'application/json'
  }
});
