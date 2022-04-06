import {
  initialCards,
  templateElement,
  listElement,
  popups,
  popupAddCard,
  formAddCard,
  inputLinkCard,
  inputTitleCard,
  buttonOpenPopupAddCard,
  buttonClosePopupAddCard,
  popupImage,
  popupImageElement,
  imageCaption,
  buttonCloseImage,
  profilePopup,
  profileOpenButton,
  profileTitle,
  profileSubtitle,
  profileCloseButton,
  profileForm,
  inputName,
  inputJob,
  ESC_CODE,
  ProfileFormValidator,
  CardFormValidator
} from "./Consts.js";

import { Card } from "./Card.js";

ProfileFormValidator.enableValidation();
CardFormValidator.enableValidation();

function createCard(item) {
  const card = new Card(item, templateElement, openPopupImage);
  const newCard = card.getCard();
  return newCard;
}

function renderCard(item) {
  const card = createCard(item);
  listElement.prepend(card);
}

initialCards.forEach((item) => {
  renderCard(item);
});

function handleFormAddCard(evt) {
  evt.preventDefault();
  renderCard({
    link: inputLinkCard.value,
    name: inputTitleCard.value,
  });
  closePopupAddCard();
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  CardFormValidator.disableSubmitButton();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
  CardFormValidator.resetErrors();
}

const openPopupAddCard = function () {
  openPopup(popupAddCard);
};

const closePopupAddCard = function () {
  closePopup(popupAddCard);
};

buttonOpenPopupAddCard.addEventListener("click", openPopupAddCard);
buttonClosePopupAddCard.addEventListener("click", closePopupAddCard);

formAddCard.addEventListener("submit", handleFormAddCard);

function openPopupImage(evt) {
  const imageElement = evt.target;
  popupImageElement.src = imageElement.src;
  popupImageElement.alt = imageElement.alt;
  imageCaption.textContent = imageElement.alt;

  openPopup(popupImage);
}

const closePopupImage = function () {
  closePopup(popupImage);
};

buttonCloseImage.addEventListener("click", closePopupImage);

const openProfilePopup = function () {
  openPopup(profilePopup);
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
};

const closeProfilePopup = function () {
  closePopup(profilePopup);
};

profileOpenButton.addEventListener("click", openProfilePopup);
profileCloseButton.addEventListener("click", closeProfilePopup);

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 

  const inputNameValue = inputName.value;
  const inputJobValue = inputJob.value;

  profileTitle.textContent = inputNameValue;
  profileSubtitle.textContent = inputJobValue;

  closeProfilePopup();
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}
