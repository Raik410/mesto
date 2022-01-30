const ProfileEditBotton = document.querySelector('.profile__botton-edit');
const popup = document.querySelector('.popup');
const popupclosebtn = document.querySelector('.popup__botton-close');
const cardHearts = document.querySelectorAll('.card__heart');
let profile = document.querySelector('.profile__intro')
let name = profile.querySelector('.profile__title')
let job = profile.querySelector('.profile__subtitle')
let formElement = document.querySelector('.popup__form')
let nameInput = formElement.querySelector('.popup__input-name')
let jobInput = formElement.querySelector('.popup__input-name_type_user-job')
let btnSubmit = formElement.querySelector('.popup__button')
const deleteButton = document.querySelector('.button-delete');
const popupImage = document.querySelector('.popup-image');
const addButtonImage = document.querySelector('.profile__button-full');
const sectionCards = document.querySelector('.cards');
const card = document.querySelector('.card');

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



// Функция для открытия popup
ProfileEditBotton.addEventListener('click', openPopup);

function openPopup() {
  popup.classList.add('popup__open');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

// Функция для закрытия popup
popupclosebtn.addEventListener('click', closePopup);
function closePopup() {
  popup.classList.remove('popup__open');
}

const popupAddCard = document.querySelector('.popup-image');
addButtonImage.addEventListener('click' , function(){
  popupAddCard.classList.add('popup__open');
});

const popupAddCardExit = popupAddCard.querySelector('.popup__botton-close');
popupAddCardExit.addEventListener('click', function () {
  popupAddCard.classList.remove('popup__open');
})

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
  sectionCards.append(cardElement);
})

// Закрывает popup кликая на фон
popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});

// Закрывает popup на клавишу esc
document.addEventListener('keydown', function (e) {
  if (e.keyCode === 27) {
    popup.classList.remove('popup__open');
  }
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (nameInput.value === '' && jobInput.value === '') {
    btnSubmit.setAttribute('disabled', true);
  }
  else if (nameInput.value !== '' && jobInput.value !== '') {
  btnSubmit.removeAttribute('disabled', true);
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup();
}
}
formElement.addEventListener('submit', formSubmitHandler);

initialCards.forEach(function (item) {
  const cardTemplate = document.querySelector('.template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;
  sectionCards.append(cardElement);
  cardElement.querySelector('.card__heart').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__heart_active');
  });
})
