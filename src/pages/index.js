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
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

// VALIDATION
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// ADDCARD POPUP
const addCardPopup = new PopupWithForm(popupAddCard, {
  handleFormSubmit: (data) => {
    addCardPopup.renderLoading(true);
    api
      .addCard(data)
      .then((item) => renderer(item))
      .catch(error)
      .finally(() => addCardPopup.renderLoading(false));
  },
});

const openPopupAddCard = () => {
  cardFormValidator.resetErrors();
  cardFormValidator.disableSubmitButton();
  addCardPopup.open();
};

addCardPopup.setEventListeners();
addCardButton.addEventListener("click", openPopupAddCard);

// DELETE CARD POPUP
const deleteCardConfirmPopup = new PopupWithConfirmation(deleteCardPopup);
deleteCardConfirmPopup.setEventListeners();

// IMAGE POPUP
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

// RENDER CARDS
const createCard = (data) => {
  const card = new Card(data, userId, templateElement, {
    handleCardClick: () => imagePopup.open(data.name, data.link),

    handleLikeClick: (id) => {
      if (card.userLike()) {
        api
          .deleteLike(id)
          .then((data) => card.handleLike(data.likes))
          .catch(error);
      } else {
        api
          .addLike(id)
          .then((data) => card.handleLike(data.likes))
          .catch(error);
      }
    },

    handleDeleteIconClick: () => {
      deleteCardConfirmPopup.open();
      deleteCardConfirmPopup.confirm(() => {
        deleteCardConfirmPopup.renderDelete(true);
        api
          .deleteCard(data._id)
          .then(() => card.handleDelete())
          .catch(error)
          .finally(() => deleteCardConfirmPopup.renderDelete(false));
      });
    },
  });

  return card.getCard();
};

const renderer = (data) => {
  const card = createCard(data);
  сardList.addItem(card);
};

const сardList = new Section(renderer, listElement);

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
