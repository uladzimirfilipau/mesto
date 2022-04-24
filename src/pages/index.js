import {
  initialCards,
  templateElement,
  listElement,
  popupAddCard,
  formAddCard,
  openPopupAddCardButton,
  popupImage,
  profilePopup,
  profileOpenButton,
  profileTitle,
  profileSubtitle,
  profileForm,
  inputName,
  inputInfo,
  object
} from "../components/Consts.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PicturePopup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const profileFormValidator = new FormValidator(object, profileForm);
const cardFormValidator = new FormValidator(object, formAddCard);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
// IMAGE POPUP
const imagePopup = new PopupWithImage(popupImage);

const openImagePopup = (name, link) => {
  imagePopup.open(name, link);
}

imagePopup.setEventListeners();
// RENDER CARDS
const createCard = (data) => {
  const card = new Card(data, templateElement, openImagePopup);
  return card.getCard();
};

const сardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = createCard(data);
      сardList.addItem(card);
    },
  },
  listElement
);

сardList.renderItems();
// ADDCARD POPUP
const addCardPopup = new PopupWithForm(popupAddCard, {
  handleFormSubmit: (data) => {
    const newCard = createCard(data);
    сardList.addItem(newCard);
  },
});

const openPopupAddCard = () => {
  cardFormValidator.resetErrors();
  cardFormValidator.disableSubmitButton();
  addCardPopup.open();
};

addCardPopup.setEventListeners();
openPopupAddCardButton.addEventListener("click", openPopupAddCard);
// PROFILE POPUP
const userInfo = new UserInfo({
  userNameSelector: profileTitle,
  userInfoSelector: profileSubtitle,
});

const profileEditPopup = new PopupWithForm(profilePopup, {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

const openProfilePopup = () => {
  const profileData = userInfo.getUserInfo();
  inputName.value = profileData.name;
  inputInfo.value = profileData.info;
  profileFormValidator.resetErrors();
  profileEditPopup.open();
};

profileEditPopup.setEventListeners();
profileOpenButton.addEventListener("click", openProfilePopup);
