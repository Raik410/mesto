import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector, text, image) {
    super(popupSelector);
    this._text = text;
    this._image = image;
  }
  open() {
    super.open();
    this._popup.querySelector(".popup__image").src = this._image;
    this._popup.querySelector(".popup__text").textContent = this._text;
    this._popup.querySelector(".popup__image").alt = this._text;
  }
  setEventListeners() {
    super.setEventListeners();
  }
}
