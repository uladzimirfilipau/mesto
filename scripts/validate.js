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

const setEventListeners = (
  formSelector,
  inputSelector,
  submitButtonSelector
) => {
  const inputList = formSelector.querySelectorAll(inputSelector);
  const submitButtonElement = formSelector.querySelector(submitButtonSelector);
  const inputListIterator = (inputSelector) => {
    const handleInput = (evt) => {
      checkInputValidity(inputSelector);
      toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    };
    inputSelector.addEventListener("input", handleInput);
  };
  toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);

  inputList.forEach(inputListIterator);
};

const enableValidation = (formSelector) => {
  const formList = document.querySelectorAll(formSelector);
  const formListIterator = (formSelector) => {
    const handleFormSubmit = (evt) => {
      evt.preventDefault();
    };
    formSelector.addEventListener("submit", handleFormSubmit);
    setEventListeners(formSelector, inputSelector, submitButtonSelector);
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
