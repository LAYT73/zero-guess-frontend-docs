---
sidebar_position: 4
sidebar_label: Creating Custom Templates
---

# 🛠️ Creating Custom Component Templates

Zero Guess Frontend allows you to generate custom components using `{componentTemplate}.zgf.yaml` templates.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
 


## 1) Create config

 

Add a `.zgfconfig.json` in the project root:

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

- `components.zgf.path` — path to your `.zgf.yaml` templates.
- `alias` — shortcuts for output folders (you can add multiple aliases).

:::tip
Keep your templates in a dedicated folder like `./templates/` inside your repo.
:::

---

## 2) Create a template file

In the specified folder (e.g., `./templates/`), create a file:

```
{componentTemplate}.zgf.yaml
```

Example file name:

```
ui-component.zgf.yaml
```

---

## 3) .zgf.yaml structure

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

**Key elements**

- `params` — parameters prompted from CLI.
- `files` — files generated using the parameters.
- `{{=paramName}}` — parameter substitution in file names/content.
- `condition` — create file only if the expression is true.

---

## 4) Hooks (optional)

You can run commands before/after generation and for each created file via hooks in `.zgf.yaml`.

 

### Supported hooks

<Tabs>
  <TabItem value="pre" label="preGenerate">

  Runs before any files are created.

  <details>
  <summary><strong>Show example</strong></summary>

  ```yaml
  hooks:
    preGenerate:
      - run: "echo Start scaffolding in {{=outputDir}}"
  ```

   </details>

  </TabItem>
  <TabItem value="after" label="afterEach">

  Runs after each file is created. Extra vars: `fileName`, `filePath`.

  <details>
  <summary><strong>Show example</strong></summary>

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

  Runs after all files are created. Extra var: `createdFiles` (JSON string array of `{ filename, fullPath }`).

  <details>
  <summary><strong>Show example</strong></summary>

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

### Step formats

- String — treated as a shell command
- Object — fields described below

<details>
<summary><strong>Step fields reference</strong></summary>


| Field              | Type               | Description                                                  |
| ------------------ | ------------------ | ------------------------------------------------------------ |
| `run`              | string             | Command to execute                                           |
| `cwd`              | string (optional)  | Working directory                                            |
| `shell`            | boolean (optional) | Run via shell (defaults to true for string steps)            |
| `continueOnError`  | boolean (optional) | Continue even if this step fails                             |
| `condition`        | string (optional)  | Template expression to decide whether to run the step        |
| `timeout`          | number (optional)  | Timeout in ms                                                |
| `env`              | object (optional)  | Environment variables (templated)                            |
| `onError`          | string | object | Command(s) to run on error (supports same step format)      |

</details>
 
 

### Context available in hooks

- All your params (e.g., `{{=componentName}}`)
- `outputDir` — resolved generation target directory
- `templateDir` — directory of the `.zgf.yaml` template

Error context in `onError` steps:

- `errorMessage` — stringified error message
- `exitCode` — process exit code
- `stdout` / `stderr` — captured streams (if available)
 
### Recipes

- __[Auto‑format each file]__
  ```yaml
  hooks:
    afterEach:
      - run: "npx prettier --write {{=filePath}}"
  ```

- __[Barrel index after generate]__
  ```yaml
  hooks:
    postGenerate:
      - run: "node ./scripts/index-files.js --dir='{{=outputDir}}'"
        cwd: "{{=templateDir}}"
  ```

- __[Git add & commit if anything changed]__
  ```yaml
  hooks:
    postGenerate:
      - run: "git add -A && git diff --cached --quiet || git commit -m 'chore(zgf): scaffold {{=componentName}}'"
        cwd: "{{=outputDir}}"
        continueOnError: true
  ```

### Troubleshooting

- __[npx prettier / eslint not found]__ — ensure dev deps installed in the target project. Try `npm i -D prettier eslint`.
- __[Permission denied / EACCES]__ — check `cwd` is correct and you have rights to write there.
- __[Template expressions not substituted]__ — use `{{=var}}` syntax and ensure param names match `params`.
- __[onError not triggered]__ — only runs on a failing step (non‑zero exit code or thrown error).

### Flow

```text
preGenerate → create files → afterEach (for every file) → postGenerate
```

### Advanced options

<details>
<summary><strong>Less common fields</strong></summary>

- __`shell`__: set to `false` to run without a shell (pass args explicitly)
- __`condition`__: treat as boolean template expression; falsy skips the step
- __`env`__: can reference template vars, e.g. `COMPONENT: "{{=componentName}}"`
- __`continueOnError`__: prefer for non‑critical lint/format steps

</details>
 

:::info
If you use tools like Prettier/ESLint, ensure they are available in the target project (e.g., installed locally so `npx` can find them).
:::

---

## 5) Generate component

```bash
zgf g ui-component @components
```

- `ui-component` — template name without `.zgf.yaml`.
- `@components` — alias from `.zgfconfig.json`.

The command will generate the component in the target folder using your template.

:::warning
This feature is in active development. If you have issues — please create an issue in the repository.
:::

---

## 🏗️ Project Structure

### Overview

| Folder                | Purpose                                                   |
| --------------------- | --------------------------------------------------------- |
| 📁 `.github/`         | GitHub Actions for npm deployment                         |
| ⚙️ `bin/`             | CLI entry point                                           |
| 🧩 `config/`          | Dependency configs (react-router-dom, mobx, etc.)         |
| 🧠 `core/`            | Core CLI logic (`setup/`, `scaffold/`)                    |
| 🧪 `examples/`        | Sample `.zgfconfig.json`, demo `component.zgf.yaml`       |
| 🛠️ `helpers/`         | Helper utilities                                          |
| 📜 `parser/`          | YAML parser for custom components                         |
| 🎛️ `presets/`         | Presets for project initialization                        |
| 🏗️ `templates/`       | Project templates (FSD, Atomic, Empty, Router, State)     |
| ✅ `tests/`            | Tests                                                      |
| 🔧 `utils/`           | Filesystem and prompt utilities                           |
| 📦 `package.json`     | Package manifest                                          |
| 📘 `README.md`        | Project readme                                            |
| 📄 `LICENSE`          | License                                                   |
| 🤝 `CONTRIBUTING.md`  | Contribution guide                                        |
| 📜 `CODE_OF_CONDUCT.md` | Code of Conduct                                         |
| 🔐 `SECURITY.md`      | Security policy                                           |

<details>
  <summary><strong>Show full tree</strong></summary>

```text
├── .github/             # GitHub Action for npm deployment
├── bin/                 # CLI entry point
├── config/              # Config for dependencies (react-router-dom, mobx etc.)
├── core/                # Core CLI logic
│   ├── setup/           # Core modules
│   └── scaffold/        # Generation modules (React etc.)
├── examples/            # Example .zgfconfig.json, demo component.zgf.yaml and /components folder
├── helpers/             # Helper functions
├── parser/              # Yaml parser for your custom components
├── presets/             # Presets for project init
├── templates/           # Project templates (React/FSD, Atomic, Empty, React-Router-Dom, State managers)
├── tests/               # Tests
├── utils/               # Utilities (fs, user requests)
├── package.json
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

</details>
