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
  }

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

  disableSubmitButton() {
    this._submitButtonElement.classList.add(this._object.inactiveButtonClass);
    this._submitButtonElement.setAttribute("disabled", true);
  }

  _enableSubmitButton() {
    this._submitButtonElement.classList.remove(
      this._object.inactiveButtonClass
    );
    this._submitButtonElement.removeAttribute("disabled");
  }

  _toggleButtonState() {
    const inputElements = Array.from(this._inputList);
    const hasInvalidInput = inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    if (hasInvalidInput) {
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
    this._form.reset();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
