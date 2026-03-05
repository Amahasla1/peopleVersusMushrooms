Работа с репозиторием peopleVersusMushrooms

Репозиторий: [UdSU-students-developers/peopleVersusMushrooms](https://github.com/UdSU-students-developers/peopleVersusMushrooms)  
Ветка нашей группы: **dev-PIe**  
В репозитории 4 проекта (папки с client/server); мы работаем только в папке **peopleArmy**.

---

## Что делают команды

| Команда | Описание |
|--------|----------|
| `git status` | Показать текущую ветку, изменённые/добавленные/неотслеживаемые файлы. |
| `git checkout <ветка>` | Переключиться на ветку (например `dev-PIe` или `main`). |
| `git checkout -b <ветка>` | Создать новую ветку и сразу переключиться на неё (для задачи/фичи). |
| `git pull origin <ветка>` | Скачать изменения с удалённого репозитория и слить их в текущую ветку. |
| `git add .` | Добавить все изменения в индекс (staging) перед коммитом. |
| `git add <файл/папка>` | Добавить в индекс только указанные файлы или папку. |
| `git commit -m "текст"` | Создать коммит с сообщением. В коммит попадает то, что в индексе после `git add`. |
| `git push origin <ветка>` | Отправить коммиты из локальной ветки в удалённую `origin`. |

---

## Порядок действий

### 1. Скопировать проект к себе (первый раз)

Если репозиторий ещё не склонирован:

```bash
# Клонировать репозиторий
git clone https://github.com/UdSU-students-developers/peopleVersusMushrooms.git
cd peopleVersusMushrooms

# Переключиться на ветку нашей группы
git checkout dev-PIe

# При необходимости подтянуть последние изменения с GitHub
git pull origin dev-PIe
```

Дальше работаете в папке `peopleArmy` (client и server).

---

### 2. Вариант А: отдельная ветка для изменений (ВСЕГДА ДЕЛАТЬ ИМЕННО ТАК)

Все изменения делаете в **отдельной ветке** (например `feature/registration` или `fix/answer-bad`). Так проще делать код-ревью и откатывать одну задачу, не трогая остальное.

```bash
# 1. Переключиться на ветку группы и подтянуть последнее
git checkout dev-PIe
git pull origin dev-PIe

# 2. Создать новую ветку от dev-PIe и переключиться на неё
git checkout -b feature/название-задачи
# Примеры имён: feature/registration, fix/mediator-typo, docs/readme

# 3. Делать правки в peopleArmy, затем проверить список изменений
git status

# 4. Добавить изменения в индекс
git add .
# или только папку проекта:  git add peopleArmy/

# 5. Закоммитить с понятным сообщением
git commit -m "Краткое описание: что сделано"

# 6. Подтянуть актуальную dev-PIe в свою ветку (на случай чужих коммитов)
git pull origin dev-PIe

# 7. Отправить свою ветку на GitHub
git push origin feature/название-задачи
```

На GitHub: **Pull request** из ветки `feature/название-задачи` в `dev-PIe`. После мержа в `dev-PIe` можно удалить ветку задачи и снова переключиться на `dev-PIe`:

```bash
git checkout dev-PIe
git pull origin dev-PIe
```

---

### 3. Вариант Б: правки сразу в dev-PIe

Работаете прямо в ветке **dev-PIe**, без отдельной ветки. Подходит для мелких правок.

```bash
# 1. Убедиться, что вы на ветке dev-PIe
git checkout dev-PIe

# 2. Подтянуть последние изменения
git pull origin dev-PIe

# 3. Посмотреть, что изменилось
git status

# 4. Добавить изменения
git add .

# 5. Коммит
git commit -m "Краткое описание: что сделано"

# 6. Ещё раз подтянуть (если кто-то успел запушить)
git pull origin dev-PIe

# 7. Отправить в dev-PIe
git push origin dev-PIe
```

---

### 4. Короткая шпаргалка (пуш в dev-PIe без отдельной ветки)

```text
git checkout dev-PIe
git pull origin dev-PIe
git status
git add .
git commit -m "описание изменений"
git pull origin dev-PIe
git push origin dev-PIe
```

**С отдельной веткой** — после пункта 2 вставить: `git checkout -b feature/имя`, в конце пушить: `git push origin feature/имя`, затем открыть Pull Request на GitHub.

---

## Важно

- Не коммитьте и не пушите изменения в чужие папки (**mushroomsArmy**, **mushroomsEconomy**, **peopleEconomy**).  
- Перед пушем всегда делайте `git pull origin dev-PIe`, чтобы не перезаписать чужие коммиты.  
- Сообщения коммитов пишите по делу: что сделано или исправлено (например: «Добавлена регистрация через медиатор», «Исправлен Answer.bad в хендлерах»).
