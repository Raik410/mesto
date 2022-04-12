import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitEvent }) {
    super(popupSelector);
    this._callBack = submitEvent;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input-name");
    this._popupSubmitButton = this._popup.querySelector('.popup__button-text');
    this._renderLoading = this._renderLoading.bind(this);
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

  _renderLoading(toggle, textLoading = 'Сохранение...', text = 'Сохранить') {
    if (toggle) {
      this._popupSubmitButton.textContent = textLoading;
    } else {
      this._popupSubmitButton.textContent = text;
    }
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
