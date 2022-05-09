import "./index.css";

import {
  templateElement,
  listElement,
  popupAddCard,
  addCardForm,
  addCardButton,
  deleteCardPopup,
  popupImage,
  profileAvatar,
  avatarEditButton,
  avatarEditPopup,
  avatarForm,
  profilePopup,
  profileForm,
  profileEditButton,
  profileTitle,
  profileSubtitle,
  object
} from "../utils/constants.js";
import { handleError } from "../utils/utils.js";

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

// API
export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40/",
  headers: {
    authorization: "d16804bc-f4c3-4d6d-8780-e08fffa15972",
    "Content-Type": "application/json",
  },
});

// ADDCARD POPUP
const addCardPopup = new PopupWithForm(popupAddCard, {
  handleFormSubmit: (data) => {
    addCardPopup.renderLoading(true);
    api
      .addCard(data)
      .then((item) => renderer(item))
      .catch(handleError)
      .finally(() => {
        addCardPopup.renderLoading(false);
        addCardPopup.close();
      });
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
          .catch(handleError);
      } else {
        api
          .addLike(id)
          .then((data) => card.handleLike(data.likes))
          .catch(handleError);
      }
    },

    handleDeleteIconClick: () => {
      deleteCardConfirmPopup.open();
      deleteCardConfirmPopup.confirm(() => {
        deleteCardConfirmPopup.renderDelete(true);
        api
          .deleteCard(data._id)
          .then(() => card.handleDelete())
          .catch(handleError)
          .finally(() => {
            deleteCardConfirmPopup.renderDelete(false);
            deleteCardConfirmPopup.close();
          });
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
  userId: userId,
});

const avatarPopup = new PopupWithForm(avatarEditPopup, {
  handleFormSubmit: (data) => {
    avatarPopup.renderLoading(true);
    api
      .editProfileAvatar(data)
      .then((data) => userInfo.setUserInfo(data))
      .catch(handleError)
      .finally(() => {
        avatarPopup.renderLoading(false);
        avatarPopup.close();
      });
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
      .catch(handleError)
      .finally(() => {
        profileEditPopup.renderLoading(false);
        profileEditPopup.close();
      });
  },
});

const openProfilePopup = () => {
  const userData = userInfo.getUserInfo();
  profileEditPopup.setInputValues(userData);

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
    userInfo.setUserInfo(profileData);
    сardList.renderItems(cardsData);
  })
  .catch(handleError);

  // VALIDATION
const profileFormValidator = new FormValidator(object, profileForm);
const cardFormValidator = new FormValidator(object, addCardForm);
const avatarFormValidator = new FormValidator(object, avatarForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();