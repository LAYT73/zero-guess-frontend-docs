---
sidebar_position: 5
sidebar_label: FAQ
---

# ❓ FAQ

<details>
  <summary><strong>В чём разница между архитектурами FSD и Atomic?</strong></summary>

FSD (Feature-Sliced Design) ориентирована на масштабируемость и доменно‑ориентированную структуру. Идеальна для крупных проектов с чёткими доменными границами.

Atomic Design — UI‑центричный подход: разбиение компонентов на атомы, молекулы, организмы и т.д. Лучше подходит для дизайн‑систем и небольших/средних проектов.
</details>

<details>
  <summary><strong>Могу ли я использовать этот инструмент в существующем React‑проекте?</strong></summary>

Не напрямую. zero-guess-frontend оптимизирован под инициализацию новых проектов с нуля.

Однако вы можете вынести шаблоны и генераторы компонентов и использовать их в существующем проекте при необходимости.
</details>

<details>
  <summary><strong>Как добавить свои шаблоны компонентов?</strong></summary>

1) Добавьте `.zgfconfig.json` в корень проекта.

2) Создайте файлы `{your-template}.zgf.yaml` в настроенной папке.

3) Используйте алиасы для указания выходных директорий.

4) Выполните:

```bash
zgf g your-template @yourAlias
```
</details>

<details>
  <summary><strong>Какие менеджеры пакетов поддерживаются?</strong></summary>

- npm
- yarn
- pnpm

Вы можете выбрать интерактивно или указать через параметр `--pm`.
</details>

<details>
  <summary><strong>Можно использовать JavaScript вместо TypeScript?</strong></summary>

Да. Поддерживаются оба языка: JavaScript и TypeScript. Укажите `--lang=js` при инициализации проекта.
</details>

<details>
  <summary><strong>Что если мне не нужны маршрутизация и стейт‑менеджер?</strong></summary>

Не проблема! Их можно пропустить в интерактивном режиме или не указывать флаги `--routing` и `--sm` в CLI.
</details>

<details>
  <summary><strong>Как работают пресеты?</strong></summary>

Вы можете сохранить предпочитаемую конфигурацию как пресет. Создайте его командой:

```bash
zgf-preset
```

Затем используйте повторно:

```bash
zgf --preset=my-preset
```

Пресеты экономят время для повторяющихся конфигураций.
</details>

<details>
  <summary><strong>Где сообщить об ошибках или предложить фичи?</strong></summary>

Создайте issue на GitHub:

https://github.com/LAYT73/zero-guess-frontend/issues
</details>

<details>
  <summary><strong>Это open source и какая лицензия?</strong></summary>

Да, проект открыт и распространяется по лицензии MIT.
</details>
