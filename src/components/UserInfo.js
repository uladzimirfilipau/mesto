// Создать класс UserInfo, который отвечает
// за управление отображением информации о пользователе на странице.
export class UserInfo {
  // Класс принимает в конструктор объект с селекторами двух элементов:
  // элемента имени пользователя и элемента информации о себе.
  constructor({ userAvatarSelector, userNameSelector, userInfoSelector }) {
    this._avatar = userAvatarSelector;
    this._name = userNameSelector;
    this._info = userInfoSelector;
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
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
