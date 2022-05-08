import "./index.css";

import {
  templateElement,
  listElement,
  popupAddCard,
  addCardButton,
  deleteCardPopup,
  popupImage,
  profileAvatar,
  avatarEditButton,
  avatarEditPopup,
  profilePopup,
  profileEditButton,
  profileTitle,
  profileSubtitle,
  inputName,
  inputInfo,
  profileFormValidator,
  cardFormValidator,
  avatarFormValidator,
  api,
  error,
} from "../utils/constants.js";

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

// VALIDATION
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

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

// PROFILE DATA
const userInfo = new UserInfo({
  userAvatarSelector: profileAvatar,
  userNameSelector: profileTitle,
  userInfoSelector: profileSubtitle,
});

const avatarPopup = new PopupWithForm(avatarEditPopup, {
  handleFormSubmit: (data) => {
    avatarPopup.renderLoading(true);
    api
      .editProfileAvatar(data)
      .then((data) => userInfo.setUserAvatar(data))
      .catch(error)
      .finally(() => avatarPopup.renderLoading(false));
  },
});

const openAvatarEditPopup = () => {
  avatarFormValidator.resetErrors();
  avatarFormValidator.disableSubmitButton();
  avatarPopup.open();
};

avatarPopup.setEventListeners();
avatarEditButton.addEventListener("click", openAvatarEditPopup);

const profileEditPopup = new PopupWithForm(profilePopup, {
  handleFormSubmit: (data) => {
    profileEditPopup.renderLoading(true);
    api
      .editProfileInfo(data)
      .then((data) => userInfo.setUserInfo(data))
      .catch(error)
      .finally(() => profileEditPopup.renderLoading(false));
  },
});

const openProfilePopup = () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputInfo.value = userData.about;
  profileFormValidator.resetErrors();
  profileEditPopup.open();
};

profileEditPopup.setEventListeners();
profileEditButton.addEventListener("click", openProfilePopup);

// INITIAL DATA
let userId;

api
  .getInitialData()
  .then((data) => {
    const [profileData, cardsData] = data;
    userId = profileData._id;
    userInfo.setUserAvatar(profileData);
    userInfo.setUserInfo(profileData);
    сardList.renderItems(cardsData);
  })
  .catch(error);