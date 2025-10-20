# Как начать новый проект?
*Обычно этим будет заниматься разработчик (ведущий разработчик), за кем закреплен этот проект.*

## Создай новый репозиторий
[Создаем репозиторий с названием проекта](https://gitlab.com/projects/new?namespace_id=6682756)

### Клонируй проект
Клонируем проект в папку `new-project` и переходим в нее
```
git clone https://gitlab.com/avdcomp/verstka/start-gulp project-name && cd project-name
```

### Инициализация GIT
`rm -rf .git` - удаляем папку `.git`, избавляясь от избыточной истории коммитов шаблона.
`git init` - инициализация Git
`git add .` - индексация всех файлов
`git commit -m "Start"` - коммитим все изменения. Внимание, все коммиты должны начинаться с ссылки на задачу!!!
`git remote add origin git@gitlab.com:avdcomp/verstka/project-name.git` - добавляем адрес созданного репозитория
`git push origin main` - пушим изменения
`git pull --rebase origin main` - если репа не пустая то сначала спуливаем с репы, а потом снова пуш.
