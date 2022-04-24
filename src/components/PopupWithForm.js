import { Popup } from "./Popup.js";
// Создать класс PopupWithForm, который наследует от Popup
export class PopupWithForm extends Popup {
  // Класс принимает в конструктор: селектор попапа и колбэк сабмита формы
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }
  // Создать приватный метод _getInputValues,
  // который собирает данные всех полей формы
  _getInputValues() {
    // создать пустой объект
    this._formValues = {};
    // добавить в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    // вернуть объект значений
    return this._formValues;
  }

  // Перезаписать родительский метод setEventListeners
  // Добавить обработчик сабмита формы
  setEventListeners() {
    this._form.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });

    super.setEventListeners();
  }
  // Перезаписать родительский метод close,
  // Добавить сброс формы
  close() {
    super.close();
    this._form.reset();
  }
}
