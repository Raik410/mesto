import "./index.css";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import {
  popupEditNameInput,
  popupEditJobInput,
  popupEditForm,
  popupAvatarForm,
  popupHandleCardForm,
  editButton,
  handleCardButton,
  sectionCards,
  validationConfig,
  allCards,
  avatar,
} from "../scripts/utils/constant.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { api } from "../scripts/components/Api.js";

// Спасибо <3

let userId;

handleCardButton.addEventListener("click", function () {
  addCardValidator.toggleButtonState();
  cardPopup.open();
});

const imagePopup = new PopupWithImage(".popup-add-card");
imagePopup.setEventListeners();

function handleCardClick(text, image) {
  imagePopup.open(text, image);
}

function createCard(text, image, likes, _id, userId, ownerId) {
  const card = new Card(
    text,
    image,
    likes,
    _id,
    userId,
    ownerId,
    ".template",
    handleCardClick,
    () => {
      console.log(_id);
      popupDelete.open();
      popupDelete.changeSubmitHandler(() => {
        api
          .deleteCard(_id)
          .then((res) => {
            card.deleteCard();
            popupDelete.close();
          })
          .catch((err) => console.log(`Ошибка: ${err}`));
      });
    },
    () => {
      if (card.isLiked()) {
        api
          .deleteLike(_id)
          .then((res) => {
            card.setLikes(res.likes);
            card.cardLike();
          })
          .catch((err) => console.log(`Ошибка: ${err}`));
      } else {
        api
          .addLike(_id)
          .then((res) => {
            card.setLikes(res.likes);
            card.cardLike();
          })
          .catch((err) => console.log(`Ошибка: ${err}`));
      }
    }
  );
  const cardElement = card.renderCard();
  return cardElement;
}

avatar.addEventListener("click", () => {
  avatarPopupValidator.toggleButtonState();
  avatarPopup.open();
});

const userInfoEx = new UserInfo({
  titleSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__image",
});

const profilePopup = new PopupWithForm(".popup-edit", {
  submitEvent: (formData, loading) => {
    loading(true);
    api
      .editProfile(formData.username, formData.about)
      .then((res) => {
        userInfoEx.setUserInfo({
          name: formData.username,
          job: formData.about,
          avatar: formData.profileAvatar,
        });
        profilePopup.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally((_) => loading(false));
  },
});

const avatarPopup = new PopupWithForm(".popup-avatar", {
  submitEvent: (formData, loading) => {
    loading(true);
    api
      .resetAvatar(formData.profileAvatar)
      .then((res) => {
        userInfoEx.setUserAvatar({
          avatar: formData.profileAvatar,
        });
        avatarPopup.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally((res) => loading(false));
  },
});
avatarPopup.setEventListeners();

const popupDelete = new PopupWithForm(".popup_type_delete-card", {});
profilePopup.setEventListeners();
popupDelete.setEventListeners();
const cardPopup = new PopupWithForm(".popup-image", {
  submitEvent: (formData, loading) => {
    loading(true);
    api
      .addCard(formData.text, formData.link)
      .then((res) => {
        const card = createCard(
          res.name,
          res.link,
          res.likes,
          res._id,
          userId,
          res.owner._id
        );
        cardSection.prependItem(card);
        cardPopup.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally((res) => loading(false));
  },
});
cardPopup.setEventListeners();
const avatarPopupValidator = new FormValidator(
  validationConfig,
  popupAvatarForm
);
avatarPopupValidator.enableValidation();
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
      const card = createCard(
        item.name,
        item.link,
        item.likes,
        item._id,
        userId,
        item.owner._id
      );
      cardSection.setItem(card);
    },
  },
  allCards
);

editButton.addEventListener("click", function () {
  const getInfo = userInfoEx.getUserInfo();
  popupEditNameInput.value = getInfo.name;
  popupEditJobInput.value = getInfo.job;
  profilePopup.open();
});

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

Promise.all([api.getProfile(), api.getInitialCards()])
  .then((res) => {
    const userInfo = res[0];
    const initialCards = res[1];

    console.log(res);
    userInfoEx.setUserInfo({ name: userInfo.name, job: userInfo.about });
    userInfoEx.setUserAvatar({ avatar: userInfo.avatar });
    userId = userInfo._id;

    return initialCards;
  })
  .then((res) => {
      cardSection.renderItems(res);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));
