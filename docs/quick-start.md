---
sidebar_position: 3
sidebar_label: Quick Start
---

# Quick Start

## Option 1: Interactive mode

Run the generator and follow the prompts:

```bash
zgf
```

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

| Option         | Alias | Type    | Description                           |
| -------------- | :---: | ------- | ------------------------------------- |
| `--name`       | `-n`  | string  | Project name                          |
| `--pm`         |       | string  | Package manager (`npm`, `yarn`, `pnpm`) |
| `--lang`       |       | string  | Language (`ts`, `js`)                 |
| `--arch`       |       | string  | Architecture (`fsd`, `atomic`, `empty`) |
| `--routing`    |       | boolean | Include `react-router-dom`            |
| `--private`    |       | boolean | Add public/private routing setup      |
| `--sm`         |       | string  | State manager (`redux`, `mobx`, `none`) |
| `--help`       |       | boolean | Show help                             |
| `--version`    |       | boolean | Show CLI version                      |
| `--preset`     |       | string  | Create project by preset              |
| `--preset-list`|       | boolean | Print list of presets                 |

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

| Option          | Alias | Type    | Description                        | Choices                 |
| --------------- | :---: | ------- | ---------------------------------- | ----------------------- |
| `--name`        | `-n`  | string  | Project name                       | —                       |
| `--pm`          |       | string  | Package manager                    | npm · yarn · pnpm       |
| `--lang`        |       | string  | Programming language               | ts · js                 |
| `--arch`        |       | string  | Architecture type                  | fsd · atomic · empty    |
| `--routing`     |       | boolean | Include `react-router-dom`         | —                       |
| `--private`     |       | boolean | Add private/public routes          | —                       |
| `--sm`          |       | string  | State manager                      | redux · mobx · none     |
| `--help`        |       | boolean | Show help                          | —                       |
| `--version`     |       | boolean | Show CLI version                   | —                       |
| `--preset`      |       | string  | Create project by preset           | —                       |
| `--preset-list` |       | boolean | Print list of presets              | —                       |

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

- __[FSD + TypeScript + routing]__
  ```bash title="CLI example"
  zgf --name=my-app --pm=yarn --lang=ts --arch=fsd --routing --private --sm=redux
  ```

- __[Minimal empty JS app]__
  ```bash
  zgf --name=playground --pm=npm --lang=js --arch=empty --sm=none
  ```

- __[Using a preset]__
  ```bash
  zgf --preset=my-preset
  ```

## 🧰 Troubleshooting

- __"zgf: command not found"__ — install globally:
  ```bash
  npm i -g zero-guess-frontend
  ```
- __Windows: cannot run scripts__ — enable script execution in PowerShell:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```
- __EACCES / permissions__ — ensure you have write access to the target folder.

---

### See also

- Installation: [installation](./installation)
- FAQ: [faq](./faq)
