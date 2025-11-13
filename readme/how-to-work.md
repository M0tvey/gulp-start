0. Удалить все ненужные библиотеки, подключения темплейтов и части кода в js, которые не будут использоваться в проекте;

1. Кастомные шрифты хранятся в папке `./src/assets/fonts`. В неё кидать шрифты с расширением `.ttf`. При сборке шрифты конвертируются в `.eot, .woff` и выплевываются в билд. Затем генерируется файл `./src/assets/style/modules/_fonts.scss` в котором подключаются все шрифты и генерируются переменные с названиями шрифтов `$font_1: 'OpenSans'; $font_2: 'Roboto'; ...`;

2. В проете используется шаблонизатор [nunjucks](https://mozilla.github.io/nunjucks/templating.html);

3. Одинаковые блоки (например, формы) находятся в папке `./src/templates/blocks` и подключаются при помощи `{% includ '' %}` (например, `{% include './src/templates/blocks/form.njk' %}`);

4. html макросы находятся в `./src/templates/macros.njk` и вызываются с помощью `{% from %}` (например, `{% from './macros.njk' import menu, link %}`);

5. Все сss библиотеки, файлы подключаются в `./src/assets/style/main.scss` при помощи `@use`;

6. Для того чтобы подключить новую библиотеку js, необходимо сделать `npm install` (например, `mpn install '... имя плагина ...' --save-dev`), зайти в `./src/assets/js/main.js` или в файл где будет использоваться библиотека и вверху прописать `import {... имя класса, функции ...} from '... путь к файлу ...'`;

7. Все html элементы относящиеся к js должны иметь класс с префиксом `js_` (`js_open_popup`);

8. Иконки хранятся в папке `./img/svg/sprite.svg`. После сборки или добавления новых иконок в эту папку автоматически создается (обновляется) svg спрайт в `./build/assets/img/svg/svg.svg` и создается (обновляется) scss файл с иконками `./src/assets/style/modules/_icons.scss`. id иконок в спрайте и ключами иконок в scss служат названия файлов. Желательно закидывать svg только с `path` с `fill` без `stroke`. Преобразовать `<circle>, <rect>, <line>, ...` можно в фигме, нажав правой кнопкой на векторе и выбрать `Outline stroke`;

  - Вывести иконку из svg спрайта можно с помощью `<svg><use></svg>` (например, `<svg><use href="../assets/img/svg/svg.svgg#... id иконки ..."></use></svg>`);

  - Вывести иконку из scss файла можно с помощью функции `icon(... id иконки ...)` (например, `background-image: icon(arrow-right);`). Предварительно в файле должен подключатся файл `./src/assets/style/modules/_icons.scss` (`@use '../modules/icons' as *;`).

9. Все переменные должны находиться в `./src/assets/style/modules/_variables.scss`;

10. Все миксины должны находиться в `./src/assets/style/modules/_mixins.scss`;

11. Все функции должны находиться в `./src/assets/style/modules/_functions.scss`;

12. Все попапы находятся в папке `./src/popups` или в конце footer-а и работают на [fancybox](https://fancyapps.com/fancybox/);

  - Локальные попапы (находятся в самой странице) вызываются ссылкой `<a href="#... id попапа ...." class="js_open_local_popup">Open popup</a>`;

  - Ссылка для вывода попап из папки `./src/popups` должна быть такой `<a href="./popups/... имя файла .... .html" class="js_open_popup">Open popup</a>`.





