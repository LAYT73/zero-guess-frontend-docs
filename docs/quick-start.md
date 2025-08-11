---
sidebar_position: 2
sidebar_label: Quick Start
---

# Quick Start

## Option 1: Interactive mode

Run the generator and follow the prompts:

```bash
zgf
```

![Demo](/img/setup.gif)

Prompts include:

- Project name
- Package manager
- Language (TypeScript / JavaScript)
- Architecture (FSD / Atomic / Empty)
- Routing (optionally with private route setup)
- State manager (RTK / Mobx / None)

## Option 2: CLI options

<details>
  <summary><strong>Show CLI options</strong></summary>

Example:

```bash title="CLI example"
zgf --name=my-app --pm=yarn --lang=ts --arch=fsd --routing --private --sm=redux
```

| Option          | Alias | Type    | Description                             |
| --------------- | :---: | ------- | --------------------------------------- |
| `--name`        | `-n`  | string  | Project name                            |
| `--pm`          |       | string  | Package manager (`npm`, `yarn`, `pnpm`) |
| `--lang`        |       | string  | Language (`ts`, `js`)                   |
| `--arch`        |       | string  | Architecture (`fsd`, `atomic`, `empty`) |
| `--routing`     |       | boolean | Include `react-router-dom`              |
| `--private`     |       | boolean | Add public/private routing setup        |
| `--sm`          |       | string  | State manager (`redux`, `mobx`, `none`) |
| `--help`        |       | boolean | Show help                               |
| `--version`     |       | boolean | Show CLI version                        |
| `--preset`      |       | string  | Create project by preset                |
| `--preset-list` |       | boolean | Print list of presets                   |

</details>

---

## 🆘 CLI Help

Run the following command to see all available CLI options:

```bash
zgf --help
```

Or to check the installed version:

```bash
zgf --version
```

Example output:

<details>
  <summary><strong>Show example output</strong></summary>

### Options

| Option          | Alias | Type    | Description                | Choices              |
| --------------- | :---: | ------- | -------------------------- | -------------------- |
| `--name`        | `-n`  | string  | Project name               | —                    |
| `--pm`          |       | string  | Package manager            | npm · yarn · pnpm    |
| `--lang`        |       | string  | Programming language       | ts · js              |
| `--arch`        |       | string  | Architecture type          | fsd · atomic · empty |
| `--routing`     |       | boolean | Include `react-router-dom` | —                    |
| `--private`     |       | boolean | Add private/public routes  | —                    |
| `--sm`          |       | string  | State manager              | redux · mobx · none  |
| `--help`        |       | boolean | Show help                  | —                    |
| `--version`     |       | boolean | Show CLI version           | —                    |
| `--preset`      |       | string  | Create project by preset   | —                    |
| `--preset-list` |       | boolean | Print list of presets      | —                    |

### Examples

```bash title="CLI example" {1-7}
zgf --name=my-app \
  --pm=yarn \
  --lang=ts \
  --arch=fsd \
  --routing \
  --private \
  --sm=redux
```

</details>

:::note
Create your own preset for faster initialization:

```bash
zgf-preset
```

Attention! For presets and other functions to work correctly, you must install the CLI globally — see [Installation](./installation).
:::

---

## 🍳 Recipes

- **[FSD + TypeScript + routing]**

  ```bash title="CLI example"
  zgf --name=my-app --pm=yarn --lang=ts --arch=fsd --routing --private --sm=redux
  ```

- **[Minimal empty JS app]**

  ```bash
  zgf --name=playground --pm=npm --lang=js --arch=empty --sm=none
  ```

- **[Using a preset]**

  ```bash
  zgf --preset=my-preset
  ```

## 🧰 Troubleshooting

- **"zgf: command not found"** — install globally:

  ```bash
  npm i -g zero-guess-frontend
  ```

- **Windows: cannot run scripts** — enable script execution in PowerShell:

  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```

- **EACCES / permissions** — ensure you have write access to the target folder.

---

### See also

- Installation: [installation](./installation)
- FAQ: [faq](./faq)
