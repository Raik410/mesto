import "./index.css";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { initialCards } from "../scripts/cards.js";
import { Section } from "../scripts/components/Section.js";
import {
  popupEditNameInput,
  popupEditJobInput,
  popupEditForm,
  popupHandleCardForm,
  editButton,
  handleCardButton,
  sectionCards,
  validationConfig,
  allCards,
} from "../scripts/utils/constant.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";

handleCardButton.addEventListener("click", function () {
  addCardValidator.toggleButtonState();
  cardPopup.open();
});

const imagePopup = new PopupWithImage(".popup-add-card");
imagePopup.setEventListeners();

function handleCardClick(text, image) {
  imagePopup.open(text, image);
}

function createCard(text, image) {
  const card = new Card(text, image, ".template", handleCardClick);
  const cardElement = card.renderCard();
  return cardElement;
}

const userInfoEx = new UserInfo({
  titleSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

const profilePopup = new PopupWithForm(".popup-edit", {
  submitEvent: (formData) => {
    userInfoEx.setUserInfo({
      name: formData.username,
      job: formData.about,
    });
    profilePopup.close();
  },
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(".popup-image", {
  submitEvent: (formData) => {
    console.log(formData);
    const card = createCard(formData.text, formData.link);
    cardSection.prependItem(card);
    cardPopup.close();
  },
});
cardPopup.setEventListeners();

const editProfileValidator = new FormValidator(validationConfig, popupEditForm);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(
  validationConfig,
  popupHandleCardForm
);
addCardValidator.enableValidation();
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item.name, item.link);
      cardSection.setItem(card);
    },
  },
  allCards
);
cardSection.renderItem();



editButton.addEventListener("click", function () {
  const getInfo = userInfoEx.getUserInfo();
  popupEditNameInput.value = getInfo.name;
  popupEditJobInput.value = getInfo.job;
  profilePopup.open();
});

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

