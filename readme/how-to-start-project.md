# Как начать новый проект?
Обычно этим будет заниматься разработчик (ведущий разработчик), за кем закреплен этот проект.

### Клонируй проект

Клонируем проект в папку `new-project` и переходим в нее
```
git clone https://gitlab.com/koshmarsianka/gulp-start project-name && cd project-name
```

### Создай новый репозиторий

Создаем репозиторий с названием проекта
```https://gitlab.com/avdcomp/new```

### Инициализация GIT

`rm -rf .git` - удаляем папку `.git`, избавляясь от избыточной истории коммитов шаблона.

`git init` - инициализация Git

`git add -A` - индексация всех файлов

`git commit -m "Start"` - коммитим все изменения. Внимание, все коммиты должны начинаться с ссылки на задачу!!!

`git remote add origin https://gitlab.com/avdcomp/project-name.git` - добавляем адресс созданного репозитория

`git push origin master` - пушим изменения

`git pull --rebase origin master` - если репа не пустая, потом снова пуш.
