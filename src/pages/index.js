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
import { Popup } from "../scripts/components/Popup.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import importImage from "../scripts/utils/importImage.js";

handleCardButton.addEventListener("click", function () {
  addCardValidator.toggleButtonState();
  handleSubmitFormAddCard.open();
});

const PopupWithImageClass = new PopupWithImage(".popup-add-card");
PopupWithImageClass.setEventListeners();

function handleCardClick(text, image) {
  PopupWithImageClass.open(text, image);
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

const handleSumbutForm = new PopupWithForm(".popup-edit", {
  submitEvent: (formData) => {
    userInfoEx.setUserInfo({
      name: formData.username,
      job: formData.about,
    });
    handleSumbutForm.close();
  },
});
handleSumbutForm.setEventListeners();

const handleSubmitFormAddCard = new PopupWithForm(".popup-image", {
  submitEvent: (formData) => {
    console.log(formData);
    const card = createCard(formData.text, formData.link);
    renderItemFromObj.prependItem(card);
    handleSubmitFormAddCard.close();
  },
});
handleSubmitFormAddCard.setEventListeners();

const editProfileValidator = new FormValidator(validationConfig, popupEditForm);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(
  validationConfig,
  popupHandleCardForm
);
addCardValidator.enableValidation();
const renderItemFromObj = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item.name, item.link);
      renderItemFromObj.setItem(card);
    },
  },
  allCards
);
renderItemFromObj.renderItem();



editButton.addEventListener("click", function () {
  const getInfo = userInfoEx.getUserInfo();
  popupEditNameInput.value = getInfo.name;
  popupEditJobInput.value = getInfo.job;
  handleSumbutForm.open();
});

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

