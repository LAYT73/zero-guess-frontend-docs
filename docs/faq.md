---
sidebar_position: 7
sidebar_label: FAQ
---

# ❓ FAQ

<details>
  <summary><strong>What is the difference between FSD and Atomic architecture?</strong></summary>

FSD (Feature-Sliced Design) focuses on scalability and domain-driven structure. It's ideal for large-scale projects with clear domain boundaries.

Atomic Design is UI-centric, breaking components down into atoms, molecules, organisms, etc., and is better suited for design systems and small-to-medium projects.
</details>

<details>
  <summary><strong>Can I use this tool with an existing React project?</strong></summary>

Not directly. zero-guess-frontend is optimized for initializing new projects from scratch.

However, you can extract templates and component generators for use in your existing project if needed.
</details>

<details>
  <summary><strong>How do I add my own component templates?</strong></summary>

1) Add a `.zgfconfig.json` in your project root.

2) Create `{your-template}.zgf.yaml` files in the configured path.

3) Use aliases to specify output folders.

4) Run:

```bash
zgf g your-template @yourAlias
```
</details>

<details>
  <summary><strong>What package managers are supported?</strong></summary>

- npm
- yarn
- pnpm

You can select one interactively or specify it via `--pm` option.
</details>

<details>
  <summary><strong>Can I use JavaScript instead of TypeScript?</strong></summary>

Yes. Both JavaScript and TypeScript are supported. Use the `--lang=js` option when initializing the project.
</details>

<details>
  <summary><strong>What if I don’t want routing or a state manager?</strong></summary>

No problem! You can skip both during interactive setup or omit `--routing` and `--sm` flags in CLI.
</details>

<details>
  <summary><strong>How do presets work?</strong></summary>

You can save your preferred setup as a preset. Create it via:

```bash
zgf-preset
```

Then reuse with:

```bash
zgf --preset=my-preset
```

Presets save time for repeatable configurations.
</details>

<details>
  <summary><strong>Where can I report bugs or suggest features?</strong></summary>

Please open an issue on the GitHub Issues page:

https://github.com/LAYT73/zero-guess-frontend/issues
</details>

<details>
  <summary><strong>Is it open source and under what license?</strong></summary>

Yes, it's open-source under the MIT License.
</details>
