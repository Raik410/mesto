export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    this._buttonElementText = this._form.querySelector(this._settings.submitButtonSelectorText);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
  }

  _setEventListeners() {
    // Берём все импуты и превращаем их в массив
    // Пробегаемся по каждому импуту чтобы добавить им обработчик 'input'
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement); // Передаем в колбек функция IsValid
        this.toggleButtonState();
      });
    });
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    // Вытаскиваем объект спана
    inputElement.classList.add(this._settings.inputErrorClass);
    // Добавляем нижний красный бордер если есть ошибка
    errorElement.textContent = errorMessage;
    // Присваиваем спану текст стандартной браузерной ошибки
    errorElement.classList.add(this._settings.errorClass);
    // Добавляем класс спану (Шрифты, красный цвет)
  };

  _hideInputError(inputElement) {
    // Вытаскиваем объект спана
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    // Удаляем классы
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    // Удаляем текст
    errorElement.textContent = "";
  };

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton()
    } else {
      this._enableSubmitButton()
    }
  };

  _disableSubmitButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElementText.classList.add(this._settings.inactiveSubmitButtonSelectorText);
      this._buttonElement.setAttribute("disabled", "");
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElementText.classList.remove(this._settings.inactiveSubmitButtonSelectorText);
    this._buttonElement.removeAttribute("disabled", "");
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  enableValidation() {
    this._setEventListeners();
  }

}

