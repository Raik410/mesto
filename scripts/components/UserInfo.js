export class UserInfo {
  constructor({ titleSelector, jobSelector }) {
    this._title = document.querySelector(titleSelector);
    this._job = document.querySelector(jobSelector);
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
}
