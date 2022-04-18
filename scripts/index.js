import {
  initialCards,
  templateElement,
  listElement,
  popupAddCard,
  inputLinkCard,
  inputTitleCard,
  openPopupAddCardButton,
  popupImage,
  profilePopup,
  profileOpenButton,
  profileTitle,
  profileSubtitle,
  inputName,
  inputJob,
  profileFormValidator,
  cardFormValidator,
} from "./Consts.js";

import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
// FORM VALIDATOR
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
// ADD DEFAULT CARDS
const createCard = (item) => {
  const card = new Card(item, templateElement, openImagePopup);
  return card.getCard();
};

const сardList = new Section(initialCards, renderer, listElement);

сardList.renderItems();
// ADD CARD
function renderer(item) {
  const card = createCard(item);
  сardList.addItem(card);
}

function handleFormAddCard() {
  renderer({
    link: inputLinkCard.value,
    name: inputTitleCard.value,
  });
  addCardPopup.close();
}
// ADDCARD POPUP
// Cоздать экземпляр класса PopupWithForm для popupAddCard
const addCardPopup = new PopupWithForm(popupAddCard, handleFormAddCard);

const openPopupAddCard = () => {
  cardFormValidator.resetErrors();
  cardFormValidator.disableSubmitButton();
  addCardPopup.open();
};

openPopupAddCardButton.addEventListener("click", openPopupAddCard);
// IMAGE POPUP
const imagePopup = new PopupWithImage(popupImage);

function openImagePopup(name, link) {
  imagePopup.open(name, link);
}
// PROFILE POPUP
// Cоздать экземпляр класса PopupWithForm для profilePopup
const profileEditPopup = new PopupWithForm(profilePopup, handleProfileFormSubmit);

const openProfilePopup = () => {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;

  profileFormValidator.resetErrors();

  profileEditPopup.open();
};

profileOpenButton.addEventListener("click", openProfilePopup);

function handleProfileFormSubmit() {

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;

  profileEditPopup.close();
};