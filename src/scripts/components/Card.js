export class Card {
  constructor(text, image, likes, _id, userId, ownedId, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._text = text;
    this._image = image;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._likes = likes;
    this._handleDeleteClick = handleDeleteClick;
    this._id = _id;
    this._userId = userId;
    this._ownerId = ownedId;
    this._handleLikeClick = handleLikeClick;
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
    this.setLikes(this._likes)
    if (this._ownerId !== this._userId) {
      this._elementDeleteCard.style.display = 'none'
    }
    const userHasLikeCard = this._likes.find(user => user._id === this._userId)
    if (userHasLikeCard) {
      this.cardLike();
    }
    return this._element;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._elementHeartCounter = this._element.querySelector('.card__heartCounter')
    this._elementHeartCounter.textContent = this._likes.length;
  }

  isLiked() {
    const userHasLikeCard = this._likes.find(user => user._id === this._userId)

    return
  }

  cardLike() {
    this._elementHeart.classList.toggle('card__heart_active');
  }
  deleteCard() {
    this._elementDeleteCard.closest('.card').remove();
  }
  // _openPopupCard() {
  //   popupInCardText.textContent = this._text;
  //   popupIncardImage.src = this._image;
  //   popupIncardImage.alt = this._text;

  //   openPopup(popupInCard);
  // }
  _setEventListeners() {
    this._elementHeart.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    })
    this._elementDeleteCard.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    })
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._text, this._image);
    })

  }
}


