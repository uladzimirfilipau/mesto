export class Card {
  constructor(
    data,
    userId,
    cardSelector,
    { handleCardClick, handleLikeClick, handleDeleteIconClick }
  ) {
    this._id = data._id;
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  userLike() {
    const liked = this._likes.some((user) => user._id === this._userId);
    return liked;
  }

  handleLike(countLikes) {
    this._likes = countLikes;

    if(this.userLike()) {
      this._likeElement.classList.add("elements__item-like_active");
    } else {
      this._likeElement.classList.remove("elements__item-like_active");
    }

    this._likeCountElement.textContent = this._likes.length;
  }

  handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEvtListener() {
    this._likeElement.addEventListener("click", () =>
      this._handleLikeClick(this._id)
    );

    this._deleteElement.addEventListener("click", () =>
      this._handleDeleteIconClick()
    );

    this._imageElement.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  _fillDataCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this.handleLike(this._likes);
  }

  _setDeleteButton() {
    if (this._ownerId === this._userId) {
      this._deleteElement.classList.add("elements__button-delete_visible");
    }
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
    this._likeCountElement = this._cardElement.querySelector(".elements__like-number");
    this._deleteElement = this._cardElement.querySelector(".elements__button-delete");

    this._setDeleteButton();
    this._fillDataCard();
    this.handleLike(this._likes);
    this._setEvtListener();

    return this._cardElement;
  }
}
