export class UserInfo {
  constructor({ titleSelector, jobSelector, avatarSelector }) {
    this._title = document.querySelector(titleSelector);
    this._job = document.querySelector(jobSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return (this._userInfo = {
      name: this._title.textContent,
      job: this._job.textContent,
    });
  }
  setUserInfo({ name, job }) {
    this._title.textContent = name;
    this._job.textContent = job;
  }

  setUserAvatar( {avatar} ) {
    this._avatarSelector.src = avatar
  }
}
