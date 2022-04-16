import {
  initialCards,
  templateElement,
  listElement,
  popupAddCard,
  formAddCard,
  inputLinkCard,
  inputTitleCard,
  openPopupAddCardButton,
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
  ProfileFormValidator,
  CardFormValidator
} from "./Consts.js";

import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
// FORM VALIDATOR
ProfileFormValidator.enableValidation();
CardFormValidator.enableValidation();
// ADD DEFAULT CARDS
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
// ADD CARD
function renderCard(item) {
  const card = createCard(item);
  сardList.addItem(card);
}

function handleFormAddCard() {
  renderCard({
    link: inputLinkCard.value,
    name: inputTitleCard.value,
  });
  addCardPopup.close();
};
// ADDCARD POPUP
const addCardPopup = new Popup(popupAddCard);

const openPopupAddCard = () => {
  formAddCard.reset();
  CardFormValidator.resetErrors();
  CardFormValidator.disableSubmitButton();
  addCardPopup.setEventListeners();
  addCardPopup.open();
};

openPopupAddCardButton.addEventListener("click", openPopupAddCard);

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
