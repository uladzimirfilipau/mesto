const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const templateElement = document.querySelector(".elements__template").content;
const listElement = document.querySelector(".elements__list");

initialCards.forEach(function (item) {
  const itemElement = templateElement
    .querySelector(".elements__item")
    .cloneNode(true);
  itemElement.querySelector(".elements__item-image").src = item.link;
  itemElement.querySelector(".elements__item-image").alt = item.name;
  itemElement.querySelector(".elements__item-title").textContent = item.name;
  listElement.append(itemElement);
  setEvtListener(itemElement);
});

// Находим попап добавления карточки
const popupAddCardElement = document.querySelector(".popup_add");
const popupAddCardButtonElement = document.querySelector(
  ".profile__button-add"
);
const popupCloseAddCardButtonElement = popupAddCardElement.querySelector(
  ".popup__button-close"
);
// Находим форму добавления карточки в DOM
const formAddElement = popupAddCardElement.querySelector(".popup__form_card");

const openAddCardPopup = function () {
  popupAddCardElement.classList.add("popup_opened");
};

const closeAddCardPopup = function () {
  popupAddCardElement.classList.remove("popup_opened");
};

popupAddCardButtonElement.addEventListener("click", openAddCardPopup);
popupCloseAddCardButtonElement.addEventListener("click", closeAddCardPopup);

function renderInitialCard(imageValue, titleValue) {
  const itemElement = templateElement
    .querySelector(".elements__item")
    .cloneNode(true);
  itemElement.querySelector(".elements__item-image").src = imageValue;
  itemElement.querySelector(".elements__item-title").textContent = titleValue;
  itemElement.querySelector(".elements__item-image").alt = titleValue;
  listElement.prepend(itemElement);
  setEvtListener(itemElement);
}

function handleFormAddCard(evt) {
  evt.preventDefault();

  const imageElement = document.querySelector(".popup__input_type_link");
  const titleElement = document.querySelector(".popup__input_type_title");

  renderInitialCard(imageElement.value, titleElement.value);

  imageElement.value = "";
  titleElement.value = "";

  closeAddCardPopup();
}

formAddElement.addEventListener("submit", handleFormAddCard);

function setEvtListener(itemElement) {
  const likeElement = itemElement.querySelector(".elements__item-like");
  likeElement.addEventListener("click", handleLike);

  const deleteElement = itemElement.querySelector(".elements__trash");
  deleteElement.addEventListener("click", handleDelete);

  const openImageElement = itemElement.querySelector(".elements__item-image");
  openImageElement.addEventListener("click", openImagePopup);
}

function handleLike(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('elements__item-like_active');
}

function handleDelete(evt) {
  const itemElement = evt.target.closest(".elements__item");
  itemElement.remove();
}

const popupImage = document.querySelector(".popup_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const captionText = popupImage.querySelector(".popup__figure-caption");
const popupCloseImageElement = popupImage.querySelector(".popup__close-image");

function openImagePopup(evt) {
  popupImage.classList.add('popup_opened');
  const itemElement = evt.target.closest(".elements__item-image");
  popupImageElement.src = itemElement.src;
  captionText.textContent = itemElement.alt;
}

const closeImagePopup = function () {
  popupImage.classList.remove("popup_opened");
};

  popupCloseImageElement.addEventListener("click", closeImagePopup);

// Находим попап редактирования имени и профессии
const popupEditElement = document.querySelector(".popup_edit");
const popupOpenButtonElement = document.querySelector(".profile__button-edit");
const profileTitleElement = document.querySelector(".profile__title");
const profileSubtitleElement = document.querySelector(".profile__subtitle");
const popupCloseButtonElement = popupEditElement.querySelector(
  ".popup__button-close"
);
// Находим форму редактирования имени и профессии в DOM
const formElement = popupEditElement.querySelector(".popup__form_name");
// Находим поля формы редактирования имени и профессии в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_job");

const openPopup = function () {
  popupEditElement.classList.add("popup_opened");
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileSubtitleElement.textContent;
};

const closePopup = function () {
  popupEditElement.classList.remove("popup_opened");
};

// Регистрируем обработчики событий по клику
popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получаем значение полей jobInput и nameInput из свойства value
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  // Вставляем новые значения с помощью textContent
  profileTitleElement.textContent = nameInputValue;
  profileSubtitleElement.textContent = jobInputValue;

  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);