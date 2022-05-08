import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._deleteButtonText = document
    .querySelector(".text__template")
    .content.querySelector(".popup__button-text_delete")
    .cloneNode(true);
  }

  confirm(deleteCard) {
    this._submit = deleteCard;
  }

  renderDelete(isLoading) {
    if (isLoading) {
      this._buttonText.replaceWith(this._deleteButtonText);
    } else {
      this._deleteButtonText.replaceWith(this._buttonText);
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit();
      this.close();
    });
  }
}
