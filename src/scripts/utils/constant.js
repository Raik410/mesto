// Popups
export const popupEdit = document.querySelector(".popup-edit");
export const popupAvatar = document.querySelector('.popup-avatar')
export const popupAvatarForm = popupAvatar.querySelector('.popup__form')
// popupEditInputs
export const popupEditNameInput = popupEdit.querySelector(".popup__input-name");
export const popupEditJobInput = popupEdit.querySelector(
  ".popup__input-name_type_user-job"
);
export const popupEditForm = popupEdit.querySelector(".popup__form");
export const popupHandleCard = document.querySelector(".popup-image");
export const popupHandleCardForm =
  popupHandleCard.querySelector(".popup__form");
// Profile
export const profile = document.querySelector(".profile");
export const editButton = profile.querySelector(".profile__botton-edit");
export const handleCardButton = profile.querySelector(".profile__button-full");
// Cards
export const sectionCards = document.querySelector(".cards");
export const allCards = ".cards";
export const avatar = document.querySelector('.profile__image');

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-name",
  submitButtonSelector: ".popup__button",
  submitButtonSelectorText: ".popup__button-text",
  inactiveSubmitButtonSelectorText: "popup__button-text_disabled",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-name_type-error",
  errorClass: "popup__input-error-active",
};
