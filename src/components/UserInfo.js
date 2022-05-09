// Создать класс UserInfo, который отвечает
// за управление отображением информации о пользователе на странице.
export class UserInfo {
  // Класс принимает в конструктор объект с селекторами элементов:
  // элемента аватара пользователя, элемента имени пользователя,
  // элемента информации о себе и идентификатор пользователя
  constructor({ userAvatarSelector, userNameSelector, userInfoSelector, userId }) {
    this._avatar = userAvatarSelector;
    this._name = userNameSelector;
    this._info = userInfoSelector;
    this._id = userId;
  }
  // Создать публичный метод getUserInfo,
  // который возвращает объект с данными пользователя.
  // Этот метод пригодится когда данные пользователя
  // нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._info.textContent,
    };
  }
  // Создать публичный метод setUserInfo,
  // который принимает новые данные пользователя
  // и добавляет их на страницу.
  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}
