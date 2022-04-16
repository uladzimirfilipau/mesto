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
import { Section } from "./Section.js";

ProfileFormValidator.enableValidation();
CardFormValidator.enableValidation();

const createCard = (item) => {
  const card = new Card(item, templateElement, openPopupImage);
  const newCard = card.getCard();
  return newCard;
};

const сardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      сardList.addItem(cardElement);
    },
  },
  listElement
);

сardList.renderItems();

function renderCard(item) {
  const card = createCard(item);
  сardList.addItem(card);
}

function handleFormAddCard() {
  renderCard({
    link: inputLinkCard.value,
    name: inputTitleCard.value,
  });
  closePopupAddCard();
};
// ALL POPUP
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
};
// ADDCARD POPUP
const openPopupAddCard = () => {
  formAddCard.reset();
  CardFormValidator.resetErrors();
  CardFormValidator.disableSubmitButton();
  openPopup(popupAddCard);
};

const closePopupAddCard = () => {
  closePopup(popupAddCard);
};

buttonOpenPopupAddCard.addEventListener("click", openPopupAddCard);
buttonClosePopupAddCard.addEventListener("click", closePopupAddCard);

formAddCard.addEventListener("submit", handleFormAddCard);
// IMAGE POPUP
function openPopupImage(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  imageCaption.textContent = name;

  openPopup(popupImage);
}

const closePopupImage = () => {
  closePopup(popupImage);
};

buttonCloseImage.addEventListener("click", closePopupImage);
// PROFILE POPUP
const openProfilePopup = () => {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;

  ProfileFormValidator.resetErrors();

  openPopup(profilePopup);
};

const closeProfilePopup = () => {
  closePopup(profilePopup);
};

profileOpenButton.addEventListener("click", openProfilePopup);
profileCloseButton.addEventListener("click", closeProfilePopup);

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const inputNameValue = inputName.value;
  const inputJobValue = inputJob.value;

  profileTitle.textContent = inputNameValue;
  profileSubtitle.textContent = inputJobValue;

  closeProfilePopup();
};

profileForm.addEventListener("submit", handleProfileFormSubmit);
// ALL POPUP
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});

const closeByEsc = (evt) => {
  if (evt.key === ESC_CODE) {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};
