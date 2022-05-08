import { FormValidator } from "../components/FormValidator.js";
import { Api } from "../components/Api.js";
/*
export const initialCards = [
    {
      name: "Эйфелева башня",
      link: "https://images.pexels.com/photos/4388221/pexels-photo-4388221.jpeg",
    },
    {
      name: "Саграда Фамилия",
      link: "https://images.pexels.com/photos/10832077/pexels-photo-10832077.jpeg",
    },
    {
      name: "Пизанская башня",
      link: "https://images.pexels.com/photos/5116646/pexels-photo-5116646.jpeg",
    },
    {
      name: "Ватикан",
      link: "https://images.pexels.com/photos/326709/pexels-photo-326709.jpeg",
    },
    {
      name: "Биг-Бен",
      link: "https://images.pexels.com/photos/2794005/pexels-photo-2794005.jpeg",
    },
    {
      name: "Колизей",
      link: "https://images.pexels.com/photos/7848820/pexels-photo-7848820.jpeg",
    },
    {
      name: "Диснейленд",
      link: "https://images.pexels.com/photos/3428289/pexels-photo-3428289.jpeg",
    },
    {
      name: "Египетские пирамиды",
      link: "https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg",
    },
    {
      name: "Великая Китайская стена",
      link: "https://images.pexels.com/photos/2304791/pexels-photo-2304791.jpeg",
    },
  ];
  */
  export const templateElement = ".elements__template";
  export const listElement = ".elements__list";
  
  export const popupAddCard = document.querySelector(".popup_add");
  const addCardForm = popupAddCard.querySelector(".popup__form_card");
  export const addCardButton = document.querySelector(".profile__button-add");

  export const deleteCardPopup = document.querySelector(".popup_delete-card");

  export const popupImage = document.querySelector(".popup_image");

  export const profileAvatar = document.querySelector(".profile__avatar");
  export const avatarEditButton = document.querySelector(".profile__avatar-edit");
  export const avatarEditPopup = document.querySelector(".popup_edit-avatar");
  const avatarForm = avatarEditPopup.querySelector(".popup__form_edit-avatar");
  export const avatarInputLink = avatarForm.querySelector(".popup__input_type_link-avatar");

  export const profilePopup = document.querySelector(".popup_edit-profile");
  export const profileEditButton = document.querySelector(".profile__button-edit");
  export const profileTitle = document.querySelector(".profile__title");
  export const profileSubtitle = document.querySelector(".profile__subtitle");
  const profileForm = profilePopup.querySelector(".popup__form_name");
  export const inputName = profileForm.querySelector(".popup__input_type_name");
  export const inputInfo = profileForm.querySelector(".popup__input_type_info");
  
  export const ESC_CODE = "Escape";

  const object = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-submit",
    inactiveButtonClass: "popup__button-submit_disabled",
    inputErrorClass: "popup__input_type_error",
    textErrorClass: "popup__error_visible",
  };

 export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40/",
  headers: {
    authorization: "d16804bc-f4c3-4d6d-8780-e08fffa15972",
    "Content-Type": "application/json",
  },
});

  export const error = (err) => {
  alert(err);
  console.log(err);
};

  export const profileFormValidator = new FormValidator(object, profileForm);
  export const cardFormValidator = new FormValidator(object, addCardForm);
  export const avatarFormValidator = new FormValidator(object, avatarForm);