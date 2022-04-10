import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitEvent }) {
    super(popupSelector);
    this._callBack = submitEvent;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input-name");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  changeSubmitHandler(newSumbitHadnler) {
    this._callBack = newSumbitHadnler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callBack(this._getInputValues(), this._renderLoading);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
