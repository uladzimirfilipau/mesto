export const initialCards = [
    {
      name: "Эйфелева башня",
      link: "https://images.pexels.com/photos/4388221/pexels-photo-4388221.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Саграда Фамилия - Искупительный храм Святого Семейства",
      link: "https://images.pexels.com/photos/10832077/pexels-photo-10832077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Пизанская башня",
      link: "https://images.pexels.com/photos/5116646/pexels-photo-5116646.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Ватикан",
      link: "https://images.pexels.com/photos/326709/pexels-photo-326709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Биг-Бен",
      link: "https://images.pexels.com/photos/2794005/pexels-photo-2794005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Колизей",
      link: "https://images.pexels.com/photos/7848820/pexels-photo-7848820.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];
  
  export const templateElement = ".elements__template";
  export const listElement = ".elements__list";
  
  export const popupAddCard = document.querySelector(".popup_add");
  export const formAddCard = popupAddCard.querySelector(".popup__form_card");

  export const openPopupAddCardButton = document.querySelector(".profile__button-add");
  export const addCardSubmitButton = popupAddCard.querySelector(".popup__button-save");

  export const popupImage = document.querySelector(".popup_image");

  export const profilePopup = document.querySelector(".popup_edit-profile");
  export const profileOpenButton = document.querySelector(".profile__button-edit");
  export const profileTitle = document.querySelector(".profile__title");
  export const profileSubtitle = document.querySelector(".profile__subtitle");
  export const profileForm = profilePopup.querySelector(".popup__form_name");
  export const inputName = profileForm.querySelector(".popup__input_type_name");
  export const inputInfo = profileForm.querySelector(".popup__input_type_info");
  
  export const ESC_CODE = "Escape";

  export const object = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button-save_disabled",
    inputErrorClass: "popup__input_type_error",
    textErrorClass: "popup__error_visible",
  };