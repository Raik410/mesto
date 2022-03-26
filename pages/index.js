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

const popupClass = new Popup(".popup-edit");
popupClass.setEventListeners();
editButton.addEventListener("click", function () {
  popupEditNameInput.value = UserInfoEx.getUserInfo().name;
  popupEditJobInput.value = UserInfoEx.getUserInfo().job;
  popupClass.open();
});

const popupClassAddCard = new Popup(".popup-image");
popupClassAddCard.setEventListeners();
handleCardButton.addEventListener("click", function () {
  popupHandleCardForm.reset();
  addCardValidator.toggleButtonState();
  popupClassAddCard.open();
});

function handleCardClick(text, image) {
  const PopupWithImageClass = new PopupWithImage(
    ".popup-add-card",
    text,
    image
  );
  PopupWithImageClass.open();
  PopupWithImageClass.setEventListeners();
}

const UserInfoEx = new UserInfo({
  titleSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

const handleSumbutForm = new PopupWithForm(".popup-edit", {
  submitEvent: (formData) => {
    UserInfoEx.setUserInfo({
      name: formData.username,
      job: formData.about,
    });
    popupClass.close();
  },
});
handleSumbutForm.setEventListeners();

const handleSubmitFormAddCard = new PopupWithForm(".popup-image", {
  submitEvent: (formData) => {
    console.log(formData);
    const card = new Card(
      formData.text,
      formData.link,
      ".template",
      handleCardClick
    );
    const cardElement = card.renderCard();
    //  return cardElement;
    addCard(cardElement);
    popupClassAddCard.close()
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
      const card = new Card(item.name, item.link, ".template", handleCardClick);
      const cardElement = card.renderCard();
      renderItemFromObj.setItem(cardElement);
    },
  },
  allCards
);
renderItemFromObj.renderItem();

const addCard = (card) => {
  sectionCards.prepend(card);
};

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
renderItemFromObj.renderItem();
