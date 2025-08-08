---
sidebar_position: 4
sidebar_label: Создание кастомных шаблонов
---

# 🛠️ Создание кастомных шаблонов компонентов

Zero Guess Frontend позволяет генерировать кастомные компоненты с помощью шаблонов `{componentTemplate}.zgf.yaml`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
 

---

## 1) Создайте конфиг

 

Добавьте файл `.zgfconfig.json` в корень проекта:

```json
{
  "components.zgf": {
    "path": "./templates/"
  },
  "alias": {
    "@components": "./src/components/"
  }
}
```

- `components.zgf.path` — путь к вашим шаблонам `.zgf.yaml`.
- `alias` — алиасы для выходных директорий (можно добавить несколько).

:::tip
Храните шаблоны в отдельной папке вроде `./templates/` внутри репозитория.
:::

---

## 2) Создайте файл шаблона

В указанной папке (например, `./templates/`) создайте файл:

```
{componentTemplate}.zgf.yaml
```

Пример имени файла:

```
ui-component.zgf.yaml
```

---

## 3) Структура `.zgf.yaml`

```yaml
params:
  componentName:
    placeholder: "Input component name"
    type: string
    default: "MyComponent"
    validator: "UpperCamelCase"

  componentStyleExtension:
    placeholder: "Select style extension"
    type: enum
    values:
      - css
      - scss
      - module.scss
      - module.css
    default: "css"

  addPublicApi:
    placeholder: "Add public Api?"
    type: boolean
    default: true

files:
  - name: "{{=componentName}}.tsx"
    content: |
      import "./{{=componentName}}.{{=componentStyleExtension}}";
      import React from "react";

      interface {{=componentName}}Props {
        children: React.ReactNode;
      }

      const {{=componentName}}: React.FC<{{=componentName}}Props> = ({ children }) => {
        return <div>{children}</div>;
      };

      export default {{=componentName}};

  - name: "{{=componentName}}.{{=componentStyleExtension}}"
    content: ""

  - name: "index.ts"
    condition: "{{=addPublicApi}}"
    content: |
      export { default as {{=componentName}} } from "./{{=componentName}}";
```

**Ключевые элементы**

- `params` — параметры, запрашиваемые в CLI.
- `files` — файлы, генерируемые на основе параметров.
- `{{=paramName}}` — подстановка параметров в именах файлов/контенте.
- `condition` — создание файла только если выражение истинно.

---

## 4) Хуки (необязательно)

Можно запускать команды до/после генерации и для каждого созданного файла через хуки в `.zgf.yaml`.

 

### Поддерживаемые хуки

<Tabs>
  <TabItem value="pre" label="preGenerate">

  Выполняется до создания любых файлов.

  <details>
  <summary><strong>Показать пример</strong></summary>

  ```yaml
  hooks:
    preGenerate:
      - run: "echo Start scaffolding in {{=outputDir}}"
  ```

   </details>

  </TabItem>
  <TabItem value="after" label="afterEach">

  Выполняется после создания каждого файла. Доп. переменные: `fileName`, `filePath`.

  <details>
  <summary><strong>Показать пример</strong></summary>

  ```yaml
  hooks:
    afterEach:
      - run: "echo Created {{=fileName}} at {{=filePath}}"
      - run: "npx prettier --write {{=filePath}}"
        condition: "{{=addPublicApi}}"
        timeout: 20000
        env:
          COMPONENT: "{{=componentName}}"
          FILE: "{{=fileName}}"
        onError:
          - run: "echo 'Prettier failed for {{=fileName}}: {{=errorMessage}}' >&2"
          - run: "node ./scripts/report-hook-failure.js --file='{{=filePath}}' --code='{{=exitCode}}'"
            cwd: "{{=templateDir}}"
        continueOnError: true
  ```

  </details>

  </TabItem>
  <TabItem value="post" label="postGenerate">

  Выполняется после создания всех файлов. Доп. переменная: `createdFiles` (JSON‑массив `{ filename, fullPath }`).

  <details>
  <summary><strong>Показать пример</strong></summary>

  ```yaml
  hooks:
    postGenerate:
      - run: "npx eslint --fix ."
        cwd: "{{=outputDir}}"
        timeout: 30000
        env:
          GEN_OUT_DIR: "{{=outputDir}}"
        onError: "echo 'ESLint failed with code {{=exitCode}}' >&2"
      - run: "node ./scripts/index-files.js --files='{{=createdFiles}}'"
        cwd: "{{=templateDir}}"
        continueOnError: true
  ```

  </details>

  </TabItem>
</Tabs>

### Форматы шагов

- Строка — интерпретируется как shell‑команда
- Объект — поля описаны ниже

<details>
<summary><strong>Справочник по полям шага</strong></summary>


| Поле              | Тип                | Описание                                                     |
| ----------------- | ------------------ | ------------------------------------------------------------ |
| `run`             | string             | Команда для выполнения                                       |
| `cwd`             | string (optional)  | Рабочая директория                                           |
| `shell`           | boolean (optional) | Запуск через shell (по умолчанию true для строковых шагов)   |
| `continueOnError` | boolean (optional) | Продолжать выполнение, даже если шаг завершился ошибкой       |
| `condition`       | string (optional)  | Шаблонное выражение — выполнять шаг только если истина       |
| `timeout`         | number (optional)  | Таймаут в мс                                                 |
| `env`             | object (optional)  | Переменные окружения (подставляются из шаблона)              |
| `onError`         | string | object   | Команда(ы), выполняемые при ошибке (поддерживает формат шага) |

</details>

 

### Контекст, доступный в хуках

- Все ваши параметры (напр., `{{=componentName}}`)
- `outputDir` — итоговая директория генерации
- `templateDir` — директория шаблона `.zgf.yaml`

Контекст ошибок в шагах `onError`:

- `errorMessage` — текст ошибки
- `exitCode` — код завершения процесса
- `stdout` / `stderr` — перехваченные потоки (если доступны)

### Рецепты

- __[Автоформат каждого файла]__
  ```yaml
  hooks:
    afterEach:
      - run: "npx prettier --write {{=filePath}}"
  ```

- __[Barrel‑индексация после генерации]__
  ```yaml
  hooks:
    postGenerate:
      - run: "node ./scripts/index-files.js --dir='{{=outputDir}}'"
        cwd: "{{=templateDir}}"
  ```

- __[Git add & commit при изменениях]__
  ```yaml
  hooks:
    postGenerate:
      - run: "git add -A && git diff --cached --quiet || git commit -m 'chore(zgf): scaffold {{=componentName}}'"
        cwd: "{{=outputDir}}"
        continueOnError: true
  ```

### Troubleshooting

- __[npx prettier / eslint не найдены]__ — установите дев‑зависимости в целевом проекте: `npm i -D prettier eslint`.
- __[Permission denied / EACCES]__ — проверьте корректность `cwd` и права на запись.
- __[Шаблонные выражения не подставились]__ — используйте синтаксис `{{=var}}` и совпадение имён с `params`.
- __[onError не срабатывает]__ — выполняется только при падении шага (ненулевой exit code или ошибка).

### Поток выполнения

```text
preGenerate → создание файлов → afterEach (для каждого файла) → postGenerate
```

### Advanced options

<details>
<summary><strong>Редко используемые поля</strong></summary>

- __`shell`__: выставьте `false`, чтобы запускать без shell (аргументы передавайте явно)
- __`condition`__: булево шаблонное выражение; при ложном значении шаг пропускается
- __`env`__: может ссылаться на шаблонные переменные, напр. `COMPONENT: "{{=componentName}}"`
- __`continueOnError`__: используйте для не‑критичных шагов (линт/формат)

</details>

:::info
Если используете Prettier/ESLint, убедитесь, что инструменты доступны в целевом проекте (например, установлены локально, чтобы `npx` их нашёл).
:::

---

## 5) Генерация компонента

```bash
zgf g ui-component @components
```

- `ui-component` — имя шаблона без `.zgf.yaml`.
- `@components` — алиас из `.zgfconfig.json`.

Команда сгенерирует компонент в целевой папке по вашему шаблону.

:::warning
Функциональность активно развивается. Если столкнулись с проблемами — создайте issue в репозитории.
:::

---

## 🏗️ Структура проекта

### Обзор

| Папка                 | Назначение                                              |
| --------------------- | ------------------------------------------------------- |
| 📁 `.github/`         | GitHub Actions для npm‑деплоя                           |
| ⚙️ `bin/`             | Точка входа CLI                                         |
| 🧩 `config/`          | Конфиги зависимостей (react-router-dom, mobx и т.д.)    |
| 🧠 `core/`            | Ядро CLI (`setup/`, `scaffold/`)                         |
| 🧪 `examples/`        | Примеры `.zgfconfig.json`, демо `component.zgf.yaml`     |
| 🛠️ `helpers/`         | Вспомогательные утилиты                                  |
| 📜 `parser/`          | YAML‑парсер для кастомных компонентов                    |
| 🎛️ `presets/`         | Пресеты для инициализации проектов                       |
| 🏗️ `templates/`       | Шаблоны проектов (FSD, Atomic, Empty, Router, State)     |
| ✅ `tests/`            | Тесты                                                    |
| 🔧 `utils/`           | Утилиты для fs и запросов к пользователю                 |
| 📦 `package.json`     | Манифест пакета                                          |
| 📘 `README.md`        | Описание проекта                                         |
| 📄 `LICENSE`          | Лицензия                                                 |
| 🤝 `CONTRIBUTING.md`  | Гайд по контрибьютингу                                   |
| 📜 `CODE_OF_CONDUCT.md` | Кодекс поведения                                       |
| 🔐 `SECURITY.md`      | Политика безопасности                                    |

<details>
  <summary><strong>Показать полный список</strong></summary>

```text
├── .github/             # GitHub Action для npm‑деплоя
├── bin/                 # Точка входа CLI
├── config/              # Конфиг для зависимостей (react-router-dom, mobx и т.д.)
├── core/                # Ядро CLI
│   ├── setup/           # Базовые модули
│   └── scaffold/        # Модули генерации (React и т.п.)
├── examples/            # Примеры: .zgfconfig.json, демо component.zgf.yaml и папка /components
├── helpers/             # Вспомогательные функции
├── parser/              # YAML‑парсер для кастомных компонентов
├── presets/             # Пресеты для инициализации проекта
├── templates/           # Шаблоны проектов (React/FSD, Atomic, Empty, React-Router-Dom, стейт‑менеджеры)
├── tests/               # Тесты
├── utils/               # Утилиты (fs, запросы к пользователю)
├── package.json
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

</details>
