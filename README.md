# Проект: MESTO

## Одностраничный сайт. Сделан в рамках третьего и четвертого курса обучения в Яндекс Практикуме.

### Обзор
* Описание
* Кодстайл
* Технологии
* Макет
* Готовая страница

**Описание**

- Сервис Mesto: интерактивная адаптивная страница, куда можно добавлять фотографии, удалять их и ставить лайки;
- 6 первых карточек выводится на страницу автоматически при помощи JavaScript;
- С помощью формы можно добавить новую карточку на страницу;
- Все попапы плавно открываются и закрываются;
- Фотографии открываются нажатием на картинку и закрываются кликом на кнопку закрытия;
- Также любой попап можно закрыть при клике за его пределами, а также нажатием на клавишу Esc;
- Все ссылки и интерактивные элементы имеют состояние наведения :hover;
- Контентные изображения имеют alt с корректным описанием, соответствующим языку страницы;
- Автоматическая валидация форм. Пользователь сразу увидит ошибку, если введёт некорректную информацию;
- Кнопка отправки формы неактивна, если хотя бы одно из полей формы не проходит валидацию.

**Кодстайл**

- Имена переменных и функций написаны в camelCase;
- Имена классов — существительные с прописной буквы;
- Имена переменных — существительные;
- Имя функции отражает то, что она делает.

**Технологии**

- В проекте использованы язык разметки документа HTML, язык описания внешнего вида документа CSS и язык программирования JavaScript;
- Соблюдены методология БЭМ и файловая структура по БЭМ;
- Позиционирование, флексбокс, грид, форма и адаптивный интерфейс для разных устройств;
- Типы данных, условия, циклы, массивы, функции, объекты, обработка событий, работа с формами, валидация форм;
- Медиа-запросы для задания специфических правил для разных размеров экранов;
- Код объектно-ориентирован. Использованы ES6-классы. Каждый класс описан в отдельном JS-файле. Каждый класс выполняет строго одну задачу;
- Для описания взаимодействия между классами используется слабое связывание, то есть внутри классов напрямую не создаются экземпляры других классов;
- Проект собран с помощью Webpack.

Проверка данных работает так:
- Данные любого поля ввода проверяются одной унифицированной функцией;
- Для проверки данных в поле используются HTML5-атрибуты и JS-свойство ValidityState;
- За состояние кнопки сабмита отвечает отдельный метод класса;
- За включение валидации формы отвечает метод класса enableValidation.

**Макет**

* [Ссылка1 на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
* [Ссылка2 на макет в Figma](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1)
* [Ссылка3 на макет в Figma](https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1)

**Готовая страница**

* Готовую страницу можно посмотреть [по этой ссылке](https://uladzimirfilipau.github.io/mesto/)
