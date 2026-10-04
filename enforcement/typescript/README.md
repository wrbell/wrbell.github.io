# TypeScript and .NET

The TypeScript and .NET domain owns this folder.
Copy the files you need into the repository that adopts them.

`eslint.config.mjs` is an ESLint flat config.
It uses `typescript-eslint` `strict` and `stylistic`.
`.prettierrc.json` sets `singleQuote` to true.
The other Prettier options stay at the defaults.
`tsconfig.base.json` sets `strict` and `noEmit`.
`dotnet.editorconfig` is the C# style file.
Copy it to `.editorconfig` in the C# repository.
`Directory.Build.props` sets `EnforceCodeStyleInBuild` and
`AnalysisLevel` to `latest-Recommended`.
`package.json` pins ESLint, typescript-eslint, TypeScript, and Prettier.
The pre-commit Prettier hook installs `prettier@3.9.9`, that same pin.
TypeScript is 6.0.3 because typescript-eslint 8.71.0 accepts TypeScript
below 6.1.0.

The configs ignore `.agents/`, `third_party/`, and `node_modules/`.
Do not add a setting that hides a real defect.

From the repository root:

```sh
npm ci --prefix enforcement/typescript
bin=enforcement/typescript/node_modules/.bin
"$bin/eslint" --config enforcement/typescript/eslint.config.mjs .
"$bin/prettier" --check --config enforcement/typescript/.prettierrc.json .
"$bin/tsc" --noEmit -p tsconfig.json
dotnet format --verify-no-changes
```

The workflow is
[`.github/workflows/typescript-dotnet.yml`](../../.github/workflows/typescript-dotnet.yml).
The CI jobs are `ts-lint` and `dotnet-format`.
The pre-commit fragment is
[`enforcement/pre-commit/fragments/typescript-dotnet.yaml`](../pre-commit/fragments/typescript-dotnet.yaml).
