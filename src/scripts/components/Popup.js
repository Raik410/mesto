export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector(".popup__botton-close");
    this._popupSubmitButton = this._popup.querySelector('.popup__button-text');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
  }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  open() {
    this._popup.classList.add("popup__open");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup__open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _renderLoading(toggle, textLoading = 'Сохранение...', text = 'Сохранить') {
  if (toggle) {
    this._popupSubmitButton.textContent = textLoading;
  } else {
    this._popupSubmitButton.textContent = text;
  }
}


  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup__open") ||
        evt.target.classList.contains("popup__botton-close")
      ) {
        this.close();
      }
    });
  }
}
