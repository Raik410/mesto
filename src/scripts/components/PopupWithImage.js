import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupText = this._popup.querySelector(".popup__text");
  }
  open(text, image) {
    super.open();
    this._popupImage.src = image
    this._popupText.textContent = text
    this._popupImage.alt = text
  }
}
