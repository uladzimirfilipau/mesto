const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileSubtitleElement.textContent;
};

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
};

// Регистрируем обработчики событий по клику
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleProfileFormSubmit);
