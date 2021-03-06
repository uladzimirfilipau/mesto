export class FormValidator {
  constructor(object, form) {
    this._object = object;
    this._form = form;

    this._inputList = Array.from(
      this._form.querySelectorAll(this._object.inputSelector)
    );

    this._submitButtonElement = this._form.querySelector(
      this._object.submitButtonSelector
    );
    
    this._submitTextElement = this._submitButtonElement.querySelector(
      this._object.submitTextSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._object.textErrorClass);
    inputElement.classList.add(this._object.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
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

  disableSubmitButton() {
    this._submitButtonElement.classList.add(this._object.inactiveButtonClass);
    this._submitTextElement.classList.add(this._object.inactiveTextClass);
    this._submitButtonElement.setAttribute("disabled", true);
  }

  _enableSubmitButton() {
    this._submitButtonElement.classList.remove(this._object.inactiveButtonClass);
    this._submitTextElement.classList.remove(this._object.inactiveTextClass);
    this._submitButtonElement.removeAttribute("disabled");
  }

  _toggleButtonState() {
    if (!this._form.checkValidity()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
