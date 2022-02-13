// Валидация
// Функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Вытаскиваем объект спана
  inputElement.classList.add("popup__input-name_type-error");
  // Добавляем нижний красный бордер если есть ошибка
  errorElement.textContent = errorMessage;
  // Присваиваем спану текст стандартной браузерной ошибки
  errorElement.classList.add("popup__form_input-error-active");
  // Добавляем класс спану (Шрифты, красный цвет)
  // Вопрос по спану, как сделать так чтобы когда добавлялся спан, то он не увеличивал высоту попапа, я думаю можно попробовать position: absolutе, но кажется это костыль
};
// Функция скрытия ошибки
const hideInputError = (formElement, inputElement) => {
  // Вытаскиваем объект спана
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Удаляем классы
  inputElement.classList.remove("popup__input-name_type-error");
  errorElement.classList.remove("popup__form_input-error-active");
  // Удаляем текст
  errorElement.textContent = "";
};
// Функция если форма валинда или нет
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, buttonElementText) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElementText.classList.add("popup__button-text_disabled");
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("popup__button_disabled");
    buttonElementText.classList.remove("popup__button-text_disabled");
    buttonElement.removeAttribute("disabled", "");
  }
};

// Функция для мгновенного показа ошибки пользователю
const setEventListeners = (formElement) => {
  // Берём все импуты и превращаем их в массив
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__input-name")
  );
  // Пробегаемся по каждому импуту чтобы добавить им обработчик 'input'
  const buttonElement = formElement.querySelector(".popup__button");
  const buttonElementText = formElement.querySelector(".popup__button-text");
  toggleButtonState(inputList, buttonElement, buttonElementText);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement); // Передаем в колбек функция IsValid
      toggleButtonState(inputList, buttonElement, buttonElementText);
    });
  });
};
// Функция для сбрасывания отправки формы всем формам сразу
const enableValidation = () => {
  // Вытаскиваем все формы с помощию массива
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  // Пробегаемся по массиву и сбрасываем ему отправку
  formList.forEach((formElement) => {
    formElement.addEventListener("input", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation({
  formElement: ".popup__form",
  inputElement: ".popup__input-name",
  buttonElement: ".popup__button",
  buttonElementDisabled: "popup__button_disabled",
  inputElementError: "popup__input-name_type-error",
  errorElement: ".${inputElement.id}-error",
});
