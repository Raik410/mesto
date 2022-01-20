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

// Можно лайкать любые карточки
for (let cardHeart of cardHearts) {
  cardHeart.onclick = function () {
    cardHeart.classList.toggle('card__heart_active');
  }
}

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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
