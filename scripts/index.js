let popupElement = document.querySelector('.popup');
let popupOpenButtonElement = document.querySelector('.popup_opened');
let popupCloseButtonElement = popupElement.querySelector('.popup__button-close');

let openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__subtitle').textContent;
};

let closePopup = function() {
  popupElement.classList.remove('popup_opened');
};

// Регистрируем обработчики событий по клику
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получаем значение полей jobInput и nameInput из свойства value
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;

  // Выбераем элементы, куда должны быть вставлены значения полей
  let profileTitleElement = document.querySelector('.profile__title');
  let profileSubtitleElement = document.querySelector('.profile__subtitle');

  // Вставляем новые значения с помощью textContent
  profileTitleElement.textContent = nameInputValue;
  profileSubtitleElement.textContent = jobInputValue;

  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
