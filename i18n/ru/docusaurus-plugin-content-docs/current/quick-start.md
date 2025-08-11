---
sidebar_position: 2
sidebar_label: Быстрый старт
---

# Быстрый старт

## Вариант 1: Интерактивный режим

Запустите генератор и следуйте подсказкам:

```bash
zgf
```

![Demo](/img/setup.gif)

Подсказки включают:

- Имя проекта
- Менеджер пакетов
- Язык (TypeScript / JavaScript)
- Архитектура (FSD / Atomic / Empty)
- Маршрутизация (опционально с приватной зоной)
- Стейт‑менеджер (RTK / Mobx / None)

## Вариант 2: Параметры CLI

<details>
  <summary><strong>Показать параметры CLI</strong></summary>

Пример:

```bash title="CLI example"
zgf --name=my-app --pm=yarn --lang=ts --arch=fsd --routing --private --sm=redux
```

| Параметр        | Алиас | Тип     | Описание                                   |
| --------------- | :---: | ------- | ------------------------------------------ |
| `--name`        | `-n`  | string  | Имя проекта                                |
| `--pm`          |       | string  | Менеджер пакетов (`npm`, `yarn`, `pnpm`)   |
| `--lang`        |       | string  | Язык (`ts`, `js`)                          |
| `--arch`        |       | string  | Архитектура (`fsd`, `atomic`, `empty`)     |
| `--routing`     |       | boolean | Включить `react-router-dom`                |
| `--private`     |       | boolean | Добавить публичную/приватную маршрутизацию |
| `--sm`          |       | string  | Стейт‑менеджер (`redux`, `mobx`, `none`)   |
| `--help`        |       | boolean | Показать справку                           |
| `--version`     |       | boolean | Показать версию CLI                        |
| `--preset`      |       | string  | Создать проект по пресету                  |
| `--preset-list` |       | boolean | Показать список пресетов                   |

</details>

---

## CLI Help

Выполните команду, чтобы посмотреть все доступные опции CLI:

```bash
zgf --help
```

Чтобы проверить установленную версию:

```bash
zgf --version
```

Пример вывода:

<details>
  <summary><strong>Показать пример вывода</strong></summary>

### Параметры

| Параметр        | Алиас | Тип     | Описание                              | Значения             |
| --------------- | :---: | ------- | ------------------------------------- | -------------------- |
| `--name`        | `-n`  | string  | Имя проекта                           | —                    |
| `--pm`          |       | string  | Менеджер пакетов                      | npm · yarn · pnpm    |
| `--lang`        |       | string  | Язык программирования                 | ts · js              |
| `--arch`        |       | string  | Тип архитектуры                       | fsd · atomic · empty |
| `--routing`     |       | boolean | Включить `react-router-dom`           | —                    |
| `--private`     |       | boolean | Добавить публичные/приватные маршруты | —                    |
| `--sm`          |       | string  | Стейт‑менеджер                        | redux · mobx · none  |
| `--help`        |       | boolean | Показать справку                      | —                    |
| `--version`     |       | boolean | Показать версию CLI                   | —                    |
| `--preset`      |       | string  | Создать проект по пресету             | —                    |
| `--preset-list` |       | boolean | Показать список пресетов              | —                    |

### Примеры

```bash title="CLI example"
zgf --name=my-app --pm=yarn --lang=ts --arch=fsd --routing --private --sm=redux
```

</details>

:::note
Создайте свой пресет для более быстрой инициализации:

```bash
zgf-preset
```

Внимание! Для корректной работы пресетов и других функций CLI необходимо установить глобально — см. раздел [Установка](./installation).
:::

---

## Рецепты

- **[FSD + TypeScript + routing]**

  ```bash title="CLI example"
  zgf --name=my-app --pm=yarn --lang=ts --arch=fsd --routing --private --sm=redux
  ```

- **[Минимальный пустой JS‑проект]**

  ```bash
  zgf --name=playground --pm=npm --lang=js --arch=empty --sm=none
  ```

- **[Использовать пресет]**

  ```bash
  zgf --preset=my-preset
  ```

## 🧰 Устранение неполадок

- **"zgf: command not found"** — установите глобально:

  ```bash
  npm i -g zero-guess-frontend
  ```

- **Windows: cannot run scripts** — разрешите выполнение скриптов в PowerShell:

  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```

- **EACCES / права доступа** — убедитесь, что у вас есть права на запись в целевую папку.

---

### Смотрите также

- Установка: [installation](./installation)
- FAQ: [faq](./faq)
