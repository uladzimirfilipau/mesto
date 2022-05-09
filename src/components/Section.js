// Создать класс Section, который отвечает за отрисовку элементов на странице
export class Section {
  // Свойство renderer — это функция, которая отвечает за создание
  // и отрисовку данных на странице.
  // Второй параметр конструктора — селектор контейнера,
  // в который нужно добавлять созданные элементы.
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  // Создать публичный метод, который отвечает за отрисовку всех элементов.
  // Отрисовка каждого отдельного элемента осуществляется функцией renderer
  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }
  // Создать публичный метод, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }
}

// У класса Section нет своей разметки.
// Он получает разметку через функцию-колбэк и вставляет её в контейнер.
