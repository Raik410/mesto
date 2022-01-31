const ProfileEditBotton = document.querySelector('.profile__botton-edit');
const popupEdit = document.querySelector('.popup');
const popupclosebtnEdit = document.querySelector('.popup__botton-close');
const cardHearts = document.querySelectorAll('.card__heart');
const profileContainer = document.querySelector('.profile__intro');
const nameProfile = profileContainer.querySelector('.profile__title');
const jobProfile = profileContainer.querySelector('.profile__subtitle');
const addButtonImage = document.querySelector('.profile__button-full');
const formContainer = document.querySelector('.popup__form');
const nameInput = formContainer.querySelector('.popup__input-name');
const jobInput = formContainer.querySelector('.popup__input-name_type_user-job');
const btnSubmit = formContainer.querySelector('.popup__button');
const popupAdd = document.querySelector('.popup-image');
const sectionCards = document.querySelector('.cards');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Добавляем обработчик к функции открытия попапа
ProfileEditBotton.addEventListener('click', openPopup);
// Открывает попап

function openPopup() {
  popupEdit.classList.add('popup__open');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

// Функция для закрытия popupEdit
popupclosebtnEdit.addEventListener('click', closePopup);
function closePopup() {
  popupEdit.classList.remove('popup__open');
};

const popupAddCard = document.querySelector('.popup-image');
addButtonImage.addEventListener('click' , function(){
  popupAddCard.classList.add('popup__open');
});

const popupAddCardExit = popupAddCard.querySelector('.popup__botton-close');
popupAddCardExit.addEventListener('click', popupImgExit);

function popupImgExit() {
  popupAddCard.classList.remove('popup__open');
};

const submitButtonCreateCard = popupAddCard.querySelector('.popup__button');
submitButtonCreateCard.addEventListener('click', function(event){
  event.preventDefault();
  const cardTemplate = document.querySelector('.template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const titleValue = popupAddCard.querySelector('.popup__input-name');
  const srcValue = popupAddCard.querySelector('.popup__input-name_type_user-job');
  cardElement.querySelector('.card__title').textContent = titleValue.value;
  cardElement.querySelector('.card__image').src = srcValue.value;
  cardElement.querySelector('.card__heart').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__heart_active');
  });
  cardElement.querySelector('.card__button-card-detele').addEventListener('click', function(evt) {
    evt.target.closest('.card').remove();
  });
  sectionCards.prepend(cardElement);
  popupImgExit();
  const cardImage = cardElement.querySelector('.card__image');
  const popupAddCards = document.querySelector('.popup-add-card');
  const popupBtnAddCardsClose = popupAddCards.querySelector('.popup__botton-close');
  // открытия попапа карточки
  cardImage.addEventListener('click', function(evt){
    popupAddCards.classList.add('popup__open');
    popupAddCards.querySelector('.popup__image').src = evt.target.src;
    popupAddCards.querySelector('.popup__text').textContent = item.name;
  })
  popupBtnAddCardsClose.addEventListener('click', function() {
    popupAddCards.classList.remove('popup__open');
  })
})

// Закрывает popup кликая на фон
popupEdit.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup();
  };
});

// Закрывает popupEdit на клавишу esc
document.addEventListener('keydown', function (e) {
  if (e.keyCode === 27) {
    popupEdit.classList.remove('popup__open');
  };
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (nameInput.value === '' && jobInput.value === '') {
    btnSubmit.setAttribute('disabled', true);
  }
  else if (nameInput.value !== '' && jobInput.value !== '') {
  btnSubmit.removeAttribute('disabled', true);
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}
}
formContainer.addEventListener('submit', formSubmitHandler);

initialCards.forEach(function (item) {
  const cardTemplate = document.querySelector('.template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;
  sectionCards.append(cardElement);
  // лайк
  cardElement.querySelector('.card__heart').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__heart_active');
  });
  // удаление карточки
  cardElement.querySelector('.card__button-card-detele').addEventListener('click', function(evt) {
    evt.target.closest('.card').remove();
  });
  const cardImage = cardElement.querySelector('.card__image');
  const popupAddCards = document.querySelector('.popup-add-card');
  const popupBtnAddCardsClose = popupAddCards.querySelector('.popup__botton-close');
  // открытия попапа карточки
  cardImage.addEventListener('click', function(evt){
    popupAddCards.classList.add('popup__open');
    popupAddCards.querySelector('.popup__image').src = evt.target.src;
    popupAddCards.querySelector('.popup__text').textContent = item.name;
  })
  popupBtnAddCardsClose.addEventListener('click', function() {
    popupAddCards.classList.remove('popup__open');
  })
});



