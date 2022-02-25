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

const templateElement = document.querySelector('.elements__template').content;
const listElement = document.querySelector('.elements__list');

initialCards.forEach(function (item) {
  const itemElement = templateElement.querySelector('.elements__item').cloneNode(true)
  itemElement.querySelector('.elements__item-image').src = item.link;
  itemElement.querySelector('.elements__item-image').alt = item.name;
  itemElement.querySelector('.elements__item-title').textContent = item.name;
  listElement.append(itemElement);
})


// Находим попап редактирования имени и профессии
const popupEditElement = document.querySelector(".popup_edit");
const popupOpenButtonElement = document.querySelector(".profile__button-edit");
const profileTitleElement = document.querySelector(".profile__title");
const profileSubtitleElement = document.querySelector(".profile__subtitle");
const popupCloseButtonElement = popupEditElement.querySelector(".popup__button-close");
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

// Находим попап добавления карточки
const popupAddCardElement = document.querySelector(".popup_add");
const popupAddCardButtonElement = document.querySelector(".profile__button-add");
const popupCloseAddCardButtonElement = popupAddCardElement.querySelector(".popup__button-close");
// Находим форму добавления карточки в DOM
const formAddElement = popupAddCardElement.querySelector(".popup__form_card");

const openAddCardPopup = function () {
  popupAddCardElement.classList.add("popup_opened");
};

const closeAddCardPopup = function () {
  popupAddCardElement.classList.remove("popup_opened");
};

// Регистрируем обработчики событий по клику
popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
popupAddCardButtonElement.addEventListener("click", openAddCardPopup);
popupCloseAddCardButtonElement.addEventListener("click", closeAddCardPopup);

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

function handleProfileFormAddCard(evt) {
  evt.preventDefault();


  closeAddCardPopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
formAddElement.addEventListener("submit", handleProfileFormAddCard);
