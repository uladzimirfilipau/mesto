export class Card {
  constructor(item, cardSelector, openPopupImage) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._openPopupImage = openPopupImage;
  }

  _handleLike = () => {
    this._likeElement.classList.toggle("elements__item-like_active");
  };

  _handleDelete = () => {
    this._cardElement.remove();
  };

  _setEvtListener() {
    this._likeElement.addEventListener("click", this._handleLike);
    this._deleteElement.addEventListener("click", this._handleDelete);
    this._imageElement.addEventListener("click", this._openPopupImage);
  }

  _fillDataCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
  }

  _getCardElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    
    return cardElement;
  }

  getCard() {
    this._cardElement = this._getCardElement();

    this._imageElement = this._cardElement.querySelector(".elements__item-image");
    this._titleElement = this._cardElement.querySelector(".elements__item-title");
    this._likeElement = this._cardElement.querySelector(".elements__item-like");
    this._deleteElement = this._cardElement.querySelector(".elements__trash");

    this._fillDataCard();
    this._setEvtListener();

    return this._cardElement;
  }
}
