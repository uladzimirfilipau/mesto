// Создать класс FormValidator, который настраивает валидацию полей формы:
export class FormValidator {
  // принимает в конструктор объект настроек с селекторами и классами формы;
  // принимает вторым параметром элемент той формы, которая валидируется;
  constructor(object, form) {
    this._object = object;
    this._form = form;
  }
  // имеет приватные методы, которые обрабатывают форму: проверяют валидность поля,
  // изменяют состояние кнопки сабмита, устанавливают все обработчики;
  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._object.textErrorClass);
    inputElement.classList.add(this._object.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = "";
    errorElement.classList.remove(this._object.textErrorClass);
    inputElement.classList.remove(this._object.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState(inputList, submitButtonElement) {
    const inputElements = Array.from(inputList);
    const hasInvalidInput = inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    if (hasInvalidInput) {
      submitButtonElement.classList.add(this._object.inactiveButtonClass);
      submitButtonElement.setAttribute("disabled", true);
    } else {
      submitButtonElement.classList.remove(this._object.inactiveButtonClass);
      submitButtonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._object.inputSelector)
    );
    const submitButtonElement = this._form.querySelector(
      this._object.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, submitButtonElement);
      });
    });
  }
  // имеет публичный метод enableValidation, который включает валидацию формы
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
