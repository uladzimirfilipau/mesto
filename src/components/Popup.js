import { ESC_CODE } from "../utils/constants.js";
// Создать класс Popup, который отвечает за открытие и закрытие попапа.
export class Popup {
  // Принимает в конструктор единственный параметр — селектор попапа.
  constructor(popupSelector) {
    this._popup = popupSelector;
    
    this._form = this._popup.querySelector(".popup__form");
    this._buttonText = this._popup.querySelector(".popup__button-text");
    this._closeButton = this._popup.querySelector(".popup__button-close");

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this.close = this.close.bind(this);
  }
  // Создать публичные методы open и close,
  // которые отвечают за открытие и закрытие попапа.
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  // Создать приватный метод _handleEscClose,
  // который содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(evt) {
    if (evt.key === ESC_CODE) {
      this.close();
    }
  }
  // Создать приватный метод _handleOverlayClose,
  // который содержит логику закрытия попапа по клику на оверлее.
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  }
  // Создать публичный метод setEventListeners,
  // который добавляет слушатель клика по иконке закрытия попапа.
  setEventListeners() {
    this._closeButton.addEventListener("click", this.close);
    // Модальное окно также закрывается при клике
    // на затемнённую область вокруг формы.
    this._popup.addEventListener("mousedown", this._handleOverlayClose);
  }
}
