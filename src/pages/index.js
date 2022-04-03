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
import { api } from '../scripts/components/Api.js';

api.getProfile()
  .then((res) => {
    console.log(res);
    userInfoEx.setUserInfo({name: res.name,
      job: res.about});
  })

api.getInitialCards()
  .then((cardList) => {
    cardList.forEach((data) => {
      const card = createCard(data.name, data.link);
      cardSection.setItem(card)
    })
  })



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
    api.editProfile(formData.username, formData.about)
    profilePopup.close();
  },
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(".popup-image", {
  submitEvent: (formData) => {
    api.addCard(formData.text, formData.link)
      .then((res) => {
        const card = createCard(res.name, res.link);
        cardSection.prependItem(card);
        cardPopup.close();
      })
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
    items: [],
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

