import { Popup } from "./Popup.js";

// Создать класс PopupWithImage, который наследует от Popup.
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = this._popup.querySelector(".popup__image");
    this._imageCaption = this._popup.querySelector(".popup__figure-caption");
  }
  // Перезаписать родительский метод open.
  // В методе open класса PopupWithImage
  // нужно вставлять в попап картинку с src изображения и подписью к картинке.
  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._imageCaption.textContent = name;
    
    super.open();
  }
}
