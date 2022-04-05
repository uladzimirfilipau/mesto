import { FormValidator } from "./FormValidator.js";

const initialCards = [
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

const templateElement = document.querySelector(".elements__template").content;
const listElement = document.querySelector(".elements__list");
const inputLinkCard = document.querySelector(".popup__input_type_link");
const inputTitleCard = document.querySelector(".popup__input_type_title");
const popupImage = document.querySelector(".popup_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const imageCaption = popupImage.querySelector(".popup__figure-caption");
const buttonCloseImage = popupImage.querySelector(".popup__button-close");
// Найти попап добавления карточки
const popupAddCard = document.querySelector(".popup_add");
// Найти кнопку открытия попапа добавления карточки
const buttonOpenPopupAddCard = document.querySelector(".profile__button-add");
// Найти кнопку закрытия попапа добавления карточки
const buttonClosePopupAddCard = popupAddCard.querySelector(
  ".popup__button-close"
);
// Найти форму добавления карточки в DOM
const formAddCard = popupAddCard.querySelector(".popup__form_card");
// Найти попап редактирования имени и профессии
const profilePopup = document.querySelector(".popup_edit");
const profileOpenButton = document.querySelector(".profile__button-edit");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileCloseButton = profilePopup.querySelector(".popup__button-close");
// Найти форму редактирования имени и профессии в DOM
const profileForm = profilePopup.querySelector(".popup__form_name");
// Найти поля формы редактирования имени и профессии в DOM
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_job");
// Найти все попапы
const popups = document.querySelectorAll(".popup");
// Создать константу со значением клавиши Escape
const ESC_CODE = "Escape";
// Найти кнопку отправки формы с карточкой
const buttonAddCardSubmit = popupAddCard.querySelector(".popup__button-save");

const object = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  textErrorClass: "popup__error_visible",
};

// Создать экземпляр класса FormValidator для каждой проверяемой формы
const ProfileFormValidator = new FormValidator(object, profileForm);
const CardFormValidator = new FormValidator(object, formAddCard);

ProfileFormValidator.enableValidation();
CardFormValidator.enableValidation();

function createCard(item) {
  const cardElement = templateElement
    .querySelector(".elements__item")
    .cloneNode(true);
  const imageElement = cardElement.querySelector(".elements__item-image");
  const titleElement = cardElement.querySelector(".elements__item-title");
  imageElement.src = item.link;
  imageElement.alt = item.name;
  titleElement.textContent = item.name;
  setEvtListener(cardElement);
  return cardElement;
}

initialCards.forEach(function (item) {
  const itemElement = createCard(item);
  listElement.append(itemElement);
});

function renderInitialCard(item) {
  const itemElement = createCard(item);
  listElement.prepend(itemElement);
}

function disableButtonSubmit(buttonAddCardSubmit) {
  buttonAddCardSubmit.classList.add("popup__button-save_disabled");
  buttonAddCardSubmit.disabled = true;
}

function handleFormAddCard(evt) {
  evt.preventDefault();
  renderInitialCard({
    link: inputLinkCard.value,
    name: inputTitleCard.value,
  });
  closePopupAddCard();
  disableButtonSubmit(buttonAddCardSubmit);
}

// Добавить класс открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

// Удалить класс открытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

const openPopupAddCard = function () {
  openPopup(popupAddCard);
};

const closePopupAddCard = function () {
  formAddCard.reset();
  closePopup(popupAddCard);
};

// Обработчик события по клику на кнопку открытия попапа добавления карточки
buttonOpenPopupAddCard.addEventListener("click", openPopupAddCard);
// Обработчик события по клику на кнопку закрытия попапа добавления карточки
buttonClosePopupAddCard.addEventListener("click", closePopupAddCard);

formAddCard.addEventListener("submit", handleFormAddCard);

function setEvtListener(itemElement) {
  const likeElement = itemElement.querySelector(".elements__item-like");
  likeElement.addEventListener("click", handleLike);

  const deleteElement = itemElement.querySelector(".elements__trash");
  deleteElement.addEventListener("click", handleDelete);

  const openImageElement = itemElement.querySelector(".elements__item-image");
  openImageElement.addEventListener("click", openPopupImage);
}

function handleLike(evt) {
  evt.target.classList.toggle("elements__item-like_active");
}

function handleDelete(evt) {
  const itemElement = evt.target.closest(".elements__item");
  itemElement.remove();
}

function openPopupImage(evt) {
  openPopup(popupImage);
  const imageElement = evt.target;
  popupImageElement.src = imageElement.src;
  popupImageElement.alt = imageElement.alt;
  imageCaption.textContent = imageElement.alt;
}

const closePopupImage = function () {
  closePopup(popupImage);
};
// Регистрируем обработчик события по клику
buttonCloseImage.addEventListener("click", closePopupImage);

const openProfilePopup = function () {
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};

const closeProfilePopup = function () {
  closePopup(profilePopup);
};

// Регистрируем обработчики событий по клику
profileOpenButton.addEventListener("click", openProfilePopup);
profileCloseButton.addEventListener("click", closeProfilePopup);

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  // Получаем значение полей jobInput и nameInput из свойства value
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  // Вставляем новые значения с помощью textContent
  profileTitle.textContent = nameInputValue;
  profileSubtitle.textContent = jobInputValue;

  closeProfilePopup();
}
// Регистрируем обработчик события по клику
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Закрыть любой попап кликом на оверлей
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});
// Закрыть любой попап нажатием на Escape
function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}
