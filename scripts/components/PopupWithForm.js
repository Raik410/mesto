import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitEvent }) {
    super(popupSelector);
    this._callBack = submitEvent;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList = this._form.querySelectorAll(".popup__input-name");
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callBack(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
