
const profileEditBotton = document.querySelector('.profile__botton-edit');
const popupEdit = document.querySelector('.popup-edit');
const popupclosebtnEdit = document.querySelector('.popup__botton-close');
const profileContainer = document.querySelector('.profile__intro');
const nameProfile = profileContainer.querySelector('.profile__title');
const jobProfile = profileContainer.querySelector('.profile__subtitle');
const addButtonImage = document.querySelector('.profile__button-full');
const formContainer = document.querySelector('.popup__form');
const nameInput = formContainer.querySelector('.popup__input-name');
const jobInput = formContainer.querySelector('.popup__input-name_type_user-job');
const popupAdd = document.querySelector('.popup-image');
const sectionCards = document.querySelector('.cards');
const popupclosebtnAddCard = popupAdd.querySelector('.popup__botton-close');
const popupAddCard = document.querySelector('.popup-image');
const submitButtonCreateCard = popupAddCard.querySelector('.popup__button');
const popupFormSubmitAddCard = popupAddCard.querySelector('.popup__form');
const cardTemplate = document.querySelector('.template').content;
const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
const cardImage = cardElement.querySelector('.card__image');
const popupAddCards = document.querySelector('.popup-add-card');
const popupBtnAddCardsClose = popupAddCards.querySelector('.popup__botton-close');
const imagePopupPreview = popupAddCards.querySelector('.popup__image')
const titlePopupPreview = popupAddCards.querySelector('.popup__text')
const titleInputValue = popupAddCard.querySelector('.popup__input-name')
const descriptionInputValue = popupAddCard.querySelector('.popup__input-name_type_user-job')
const submitButtonCreateCardText = popupAddCard.querySelector('.popup__button-text');

// Делаем шаблон для всех popup (Открытия попап)
function openPopup(popup) {
  popup.classList.add('popup__open');
  document.addEventListener('keydown', closeByEscape);
}
// Делаем шаблон для всех popup (Закрытие попап)
function closePopup(popup) {
  popup.classList.remove('popup__open');
  document.removeEventListener('keydown', closeByEscape);
}

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup__open')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__botton-close')) {
          closePopup(popup)
        }
    })
})


// function closePopupSpace(evt) {
//   if (evt.target === evt.currentTarget) {
//     const openedPopup = document.querySelector('.popup__open')
//     closePopup(openedPopup)
//   }
// }

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__open')
    closePopup(openedPopup)
  }
}

// Открываем popupEdit
profileEditBotton.addEventListener('click', function(){
  openPopup(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

// Открываем popupAdd
addButtonImage.addEventListener('click', function(){
  openPopup(popupAdd);
})
// Закрываем popupAdd
// popupclosebtnAddCard.addEventListener('click', function(){
//   closePopup(popupAdd);
// })
// Функция создания карточки
function createCard (name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = name;   // Присваиваем заголовку карточки аргумент функции
  cardImage.src = link;    // Присваиваем фото карточки аргумент функции
  cardImage.alt = name; // Присваиваем альт карточки аргумент функции
  cardElement.querySelector('.card__heart').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__heart_active'); // Делаем лайк карточке
  });
  cardElement.querySelector('.card__button-card-detele').addEventListener('click', function(evt) {
    evt.target.closest('.card').remove();  // Удаление карточки
  });
  cardImage.addEventListener('click', function(){  // Попап для открытия попапа прямо с карточки
    openPopup(popupAddCards);
    // closePopupBackground(popupAddCards);
    imagePopupPreview.src = link; // Присваиваем картинке попапа аргумент функции
    titlePopupPreview.textContent = name; // Присваиваем тексту попапа аргумент функции
    imagePopupPreview.alt = name; // Присваиваем альт попапа аргунт функции
  })
  return cardElement; // Делаем карточку видимой
}

// Рендерим карточки передавая аргументы функции которую мы уже создали
initialCards.forEach(function(item) {
  sectionCards.prepend(createCard(item.name, item.link));
})

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  sectionCards.prepend(createCard(titleInputValue.value, descriptionInputValue.value));
  closePopup(popupAdd);
  popupFormSubmitAddCard.reset();
    submitButtonCreateCard.setAttribute('disabled', '')
    submitButtonCreateCard.classList.add(validationConfig.inactiveButtonClass);
    submitButtonCreateCardText.classList.add(validationConfig.inactiveSubmitButtonSelectorText);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

formContainer.addEventListener('submit', handleProfileFormSubmit);
popupFormSubmitAddCard.addEventListener('submit', handleCardFormSubmit);

