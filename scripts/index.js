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
  inputInfo,
  profileFormValidator,
  cardFormValidator,
} from "./Consts.js";

import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

const openImagePopup = (name, link) => {
  const imagePopup = new PopupWithImage(popupImage);
  imagePopup.open(name, link);
  imagePopup.setEventListeners();
}

// RENDER CARDS
const createCard = (item) => {
  const card = new Card(item, templateElement, openImagePopup);
  return card.getCard();
};

const сardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      сardList.addItem(card);
    },
  },
  listElement
);

сardList.renderItems();
// ADDCARD POPUP
const addCardPopup = new PopupWithForm(popupAddCard, {
  handleFormSubmit: () => {
    const card = createCard({
      link: inputLinkCard.value,
      name: inputTitleCard.value,
    });
    сardList.addItem(card);
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
