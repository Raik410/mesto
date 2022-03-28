import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(text, image) {
    super.open();
    this._popup.querySelector(".popup__image").src = image
    this._popup.querySelector(".popup__text").textContent = text
    this._popup.querySelector(".popup__image").alt = text
  }
}
