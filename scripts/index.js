// Спасибо за подробное ревью, вы очень помогли с понимаем всей этой кучи теории <3
// Вы не знаете будет ли разбор данной проектной? Допустим в тренажере
const profileEditBotton = document.querySelector('.profile__botton-edit');
const popupEdit = document.querySelector('.popup-edit');
const popupclosebtnEdit = document.querySelector('.popup__botton-close');
const cardHearts = document.querySelectorAll('.card__heart');
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

// Делаем шаблон для всех popup (Открытия попап)
function openPopup(popup) {
  popup.classList.add('popup__open');
}
// Делаем шаблон для всех popup (Закрытие попап)
function closePopup(popup) {
  popup.classList.remove('popup__open');
}

function closePopupBackground(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
}
function closePopupOnKey(popup) {
  document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === "Escape") {
      closePopup(popup)
    }
  });
};

// Открываем popupEdit
profileEditBotton.addEventListener('click', function(){
  openPopup(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  closePopupBackground(popupEdit);
  closePopupOnKey(popupEdit)
});
// Закрываем popupEdit
popupclosebtnEdit.addEventListener('click', function(){
  closePopup(popupEdit);
})
// Открываем popupAdd
addButtonImage.addEventListener('click', function(){
  openPopup(popupAdd);
  closePopupBackground(popupAdd);
  closePopupOnKey(popupAdd)
})
// Закрываем popupAdd
popupclosebtnAddCard.addEventListener('click', function(){
  closePopup(popupAdd);
})
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
    closePopupBackground(popupAddCards);
    closePopupOnKey(popupAddCards)
    imagePopupPreview.src = link; // Присваиваем картинке попапа аргумент функции
    titlePopupPreview.textContent = name; // Присваиваем тексту попапа аргумент функции
    imagePopupPreview.alt = name; // Присваиваем альт попапа аргунт функции
  })
  popupBtnAddCardsClose.addEventListener('click', function(){
    closePopup(popupAddCards);
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
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

formContainer.addEventListener('submit', handleProfileFormSubmit);
popupFormSubmitAddCard.addEventListener('submit', handleCardFormSubmit);
// Валидация
// Функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  // Вытаскиваем объект спана
  inputElement.classList.add('popup__input-name_type-error')
  // Добавляем нижний красный бордер если есть ошибка
  errorElement.textContent = errorMessage;
  // Присваиваем спану текст стандартной браузерной ошибки
  errorElement.classList.add('popup__form_input-error-active')
  // Добавляем класс спану (Шрифты, красный цвет)
  // Вопрос по спану, как сделать так чтобы когда добавлялся спан, то он не увеличивал высоту попапа, я думаю можно попробовать position: absolutе, но кажется это костыль
}
// Функция скрытия ошибки
const hideInputError = (formElement, inputElement) => {
   // Вытаскиваем объект спана
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  // Удаляем классы
  inputElement.classList.remove('popup__input-name_type-error')
  errorElement.classList.remove('popup__form_input-error-active');
  // Удаляем текст
  errorElement.textContent = '';
}
// Функция если форма валинда или нет
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement, buttonElementText) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
    buttonElementText.classList.add('popup__button-text_disabled');
    buttonElement.setAttribute('disabled', '')
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElementText.classList.remove('popup__button-text_disabled');
    buttonElement.removeAttribute('disabled', '')
  }
}

// Функция для мгновенного показа ошибки пользователю
const setEventListeners = (formElement) => {
  // Берём все импуты и превращаем их в массив
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-name'))
  // Пробегаемся по каждому импуту чтобы добавить им обработчик 'input'
  const buttonElement = formElement.querySelector('.popup__button');
  const buttonElementText = formElement.querySelector('.popup__button-text')
  toggleButtonState(inputList, buttonElement, buttonElementText);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement) // Передаем в колбек функция IsValid
      toggleButtonState(inputList, buttonElement, buttonElementText);
    })
  })
}
// Функция для сбрасывания отправки формы всем формам сразу
const enableValidation = () => {
  // Вытаскиваем все формы с помощию массива
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  // Пробегаемся по массиву и сбрасываем ему отправку
  formList.forEach((formElement) => {
    formElement.addEventListener('input', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  })
}

enableValidation();
