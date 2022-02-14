

// Валидация
// Функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Вытаскиваем объект спана
  inputElement.classList.add(validationConfig.inputErrorClass);
  // Добавляем нижний красный бордер если есть ошибка
  errorElement.textContent = errorMessage;
  // Присваиваем спану текст стандартной браузерной ошибки
  errorElement.classList.add(validationConfig.errorClass);
  // Добавляем класс спану (Шрифты, красный цвет)
  // Вопрос по спану, как сделать так чтобы когда добавлялся спан, то он не увеличивал высоту попапа, я думаю можно попробовать position: absolutе, но кажется это костыль
};
// Функция скрытия ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  // Вытаскиваем объект спана
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Удаляем классы
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  // Удаляем текст
  errorElement.textContent = "";
};
// Функция если форма валинда или нет
const isValid = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, buttonElementText, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElementText.classList.add(validationConfig.inactiveSubmitButtonSelectorText);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElementText.classList.remove(validationConfig.inactiveSubmitButtonSelectorText);
    buttonElement.removeAttribute("disabled", "");
  }
};

// Функция для мгновенного показа ошибки пользователю
const setEventListeners = (formElement, validationConfig) => {
  // Берём все импуты и превращаем их в массив
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  // Пробегаемся по каждому импуту чтобы добавить им обработчик 'input'
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  const buttonElementText = formElement.querySelector(validationConfig.submitButtonSelectorText);
  toggleButtonState(inputList, buttonElement, buttonElementText, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig); // Передаем в колбек функция IsValid
      toggleButtonState(inputList, buttonElement, buttonElementText, validationConfig);
    });
  });
};


const enableValidation = (validationConfig) => {
    // Вытаскиваем все формы с помощию массива
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    // Пробегаемся по массиву и сбрасываем ему отправку
    formList.forEach((formElement) => {
      formElement.addEventListener("input", (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, validationConfig);
    });
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-name',
  submitButtonSelector: '.popup__button',
  submitButtonSelectorText: '.popup__button-text',
  inactiveSubmitButtonSelectorText: 'popup__button-text_disabled',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-name_type-error',
  errorClass: 'popup__form_input-error-active'
};

enableValidation(validationConfig);


