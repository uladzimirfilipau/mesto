const object = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  textErrorClass: "popup__error_visible",
};

const {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  textErrorClass,
} = object;

const showInputError = (
  inputSelector,
  textErrorClass,
  inputErrorClass,
  errorMessage
) => {
  const errorElement = inputSelector.nextElementSibling;
  errorElement.textContent = errorMessage;
  errorElement.classList.add(textErrorClass);
  inputSelector.classList.add(inputErrorClass);
};

const hideInputError = (inputSelector, textErrorClass, inputErrorClass) => {
  const errorElement = inputSelector.nextElementSibling;
  errorElement.textContent = "";
  errorElement.classList.remove(textErrorClass);
  inputSelector.classList.remove(inputErrorClass);
};

const checkInputValidity = (inputSelector) => {
  const isInputNotValid = !inputSelector.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputSelector.validationMessage;
    showInputError(
      inputSelector,
      textErrorClass,
      inputErrorClass,
      errorMessage
    );
  } else {
    hideInputError(inputSelector, textErrorClass, inputErrorClass);
  }
};

const toggleButtonState = (
  inputList,
  submitButtonElement,
  inactiveButtonClass
) => {
  const inputElements = Array.from(inputList);
  const hasInvalidInput = inputElements.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
  if (hasInvalidInput) {
    submitButtonElement.classList.add(inactiveButtonClass);
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
    submitButtonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass
) => {
  const inputList = formSelector.querySelectorAll(inputSelector);
  const submitButtonElement = formSelector.querySelector(submitButtonSelector);
  const inputListIterator = (inputSelector) => {
    const handleInput = () => {
      checkInputValidity(inputSelector);
      toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    };
    inputSelector.addEventListener("input", handleInput);
  };
  toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);

  inputList.forEach(inputListIterator);
};

const enableValidation = (formSelector, inputSelector, submitButtonSelector, inactiveButtonClass) => {
  const formList = document.querySelectorAll(formSelector);
  const formListIterator = (formSelector) => {
    const handleFormSubmit = (evt) => {
      evt.preventDefault();
    };
    formSelector.addEventListener("submit", handleFormSubmit);
    setEventListeners(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass);
  };
  formList.forEach(formListIterator);
};

enableValidation(
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  textErrorClass
);
