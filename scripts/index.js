import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js';
import { initialCards } from './cards.js';
// Popups
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup-edit');
// popupEditInputs
const popupEditNameInput = popupEdit.querySelector('.popup__input-name');
const popupEditJobInput = popupEdit.querySelector('.popup__input-name_type_user-job');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupHandleCard = document.querySelector('.popup-image');
// popupHandleCardInputs
const popupHandleCardNameInput = popupHandleCard.querySelector('.popup__input-name');
const popupHandleCardLinkInput = popupHandleCard.querySelector('.popup__input-name_type_user-job');
const popupHandleCardForm = popupHandleCard.querySelector('.popup__form');
const popupInCard = document.querySelector('.popup-add-card');
const popupInCardText = popupInCard.querySelector('.popup__text');
const popupIncardImage = popupInCard.querySelector('.popup__image');
// Profile
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__botton-edit');
const handleCardButton = profile.querySelector('.profile__button-full');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
// Cards
const sectionCards = document.querySelector('.cards');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-name',
  submitButtonSelector: '.popup__button',
  submitButtonSelectorText: '.popup__button-text',
  inactiveSubmitButtonSelectorText: 'popup__button-text_disabled',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-name_type-error',
  errorClass: 'popup__input-error-active'
};


const addCard = card => {
  sectionCards.prepend(card);
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.template');
  const cardElement = card.renderCard();
  addCard(cardElement);
})

function openPopup(popup) {
  popup.classList.add("popup__open");
  document.addEventListener("keydown", closeByEscape);
  popupHandleCardForm.reset();
}
// Делаем шаблон для всех popup (Закрытие попап)
function closePopup(popup) {
  popup.classList.remove("popup__open");
  document.removeEventListener("keydown", closeByEscape);
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup__open")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__botton-close")) {
      closePopup(popup);
    }
  });
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup__open");
    closePopup(openedPopup);
  }
}

editButton.addEventListener("click", function () {
  openPopup(popupEdit);
  popupEditNameInput.value = profileTitle.textContent;
  popupEditJobInput.value = profileSubtitle.textContent;
});

handleCardButton.addEventListener('click', function() {
  openPopup(popupHandleCard);
})

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupEditNameInput.value;
  profileSubtitle.textContent = popupEditJobInput.value;
  closePopup(popupEdit);
}

popupEditForm.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card(popupHandleCardNameInput.value, popupHandleCardLinkInput.value, '.template');
  const cardElement = card.renderCard();
  addCard(cardElement);
  addCardValidator.disableSubmitButton()
  closePopup(popupHandleCard);
}

popupHandleCardForm.addEventListener('submit', handleCardFormSubmit);

const editProfileValidator = new FormValidator(validationConfig, popupEditForm)
const addCardValidator = new FormValidator(validationConfig, popupHandleCardForm)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()


export {popupInCardText, popupIncardImage, openPopup, popupInCard}
