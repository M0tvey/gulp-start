# Структура проекта

```
.
├── gulpfile.js                                 # файл конфигурации gulp
├── package-lock.json                           # файл конфигурации gulp
├── package.json                                # файл конфигурации gulp
├── readme                                      #readme
│   ├── check-list.md
│   ├── how-to-start-project.md
│   ├── how-to-work.md
│   └── install-and-start.md
└── src                                         # папка исходников
    ├── assets                                  # картинки, скрипты, попапы, фавиконы, стили
    │   ├── img
    │   │   ├── icons
    │   │   │   
    │   │   └── svg
    │   │       ├── arrow-down.svg
    │   │       └── sprite.svg                  # здесь собираются спрайты svg
    │   ├── js                                  # скрипты
    │   │   └── main.js
    │   ├── popups                              # попапы
    │   │   └── postmessage.html                # сообщениие после отправки формы
    │   ├── root                                # статика 
    │   │   └── favicon.ico                     # favicon    
    │   └── style                               # стили    
    │       ├── _fonts.scss                     # шрифты
    │       ├── _form.scss                      # стили формы 
    │       ├── _map-cluster.scss               # шаблон стиля карты (кластеризация) - если не нужно,- удалить
    │       ├── _map-simple.scss                # шаблон стиля карты (простая) - если не нужно,- удалить
    │       ├── _mmenu.scss                     # шаблон стиля мобильного меню с плагином mmenu если не нужно,- удалить
    │       ├── _variables.scss                 # все переменные, миксины scss
    │       └── main.scss                       # основной файл стилей
    ├── index.html                              # sitemap
    ├── map-cluster.json                        # шаблон json карты (кластеризация) - если не нужно,- удалить
    ├── map-simple.json                         # шаблон json карты (простая) - если не нужно,- удалить
    ├── response-form.json                      # имитация ответа сервера после отправки формы
    └── templates                               # шаблоны (одинаковые блоки для вставки на страницы)     
        ├── blocks                               
        │   ├── form.html                       # шаблон формы html - если не нужно,- удалить    
        │   ├── map-cluster.html                # шаблон карты html (кластеризация) - если не нужно,- удалить
        │   ├── map-simple.html                 # шаблон карты html (простая) - если не нужно,- удалить
        │   ├── mmenu-footer.html               # шаблон футера для плагина mmenu - если не нужно,- удалить
        │   └── mmenu-header.html               # шаблон хедера для плагина mmenu - если не нужно,- удалить
        ├── footer.html                         # шаблон подключения основного футера
        └── header-inner.html                   # шаблон подключения основного хедера    

```
