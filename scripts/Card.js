import {popupInCardText, popupIncardImage, openPopup, popupInCard} from './index.js'
export class Card {
  constructor(text, image, cardTemplateSelector) {
    this._text = text;
    this._image = image;
    this._cardTemplateSelector = cardTemplateSelector;
  }
  _getTemplate() {
    const cardItem = document
    .querySelector(this._cardTemplateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardItem;
  }
  renderCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.card__image');
    this._elementText = this._element.querySelector('.card__title');
    this._elementHeart = this._element.querySelector('.card__heart');
    this._elementDeleteCard = this._element.querySelector('.card__button-card-detele');

    this._elementImage.src = this._image;
    this._elementText.textContent = this._text;
    this._elementImage.alt = this._text;
    this._setEventListeners();

    return this._element;
  }
  _cardLike() {
    this._elementHeart.classList.toggle('card__heart_active');
  }
  _deleteCard() {
    this._elementDeleteCard.closest('.card').remove();
  }
  _openPopupCard() {
    popupInCardText.textContent = this._text;
    popupIncardImage.src = this._image;
    popupIncardImage.alt = this._text;

    openPopup(popupInCard);
  }
  _setEventListeners() {
    this._elementHeart.addEventListener('click', () => {
      this._cardLike();
    })
    this._elementDeleteCard.addEventListener('click', () => {
      this._deleteCard();
    })
    this._elementImage.addEventListener('click', () => {
      this._openPopupCard();
    })
  }
}


