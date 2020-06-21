<img alt="RecifeJs" width="400" src="https://raw.githubusercontent.com/recifejs/recife/master/logo.png" />

[![npm version](https://img.shields.io/npm/v/recife-express?style=flat-square&logo=npm)](https://www.npmjs.com/package/recife-express) [![License: MIT](https://img.shields.io/github/license/recifejs/recife-express?style=flat-square)](https://github.com/recifejs/recife-express/blob/master/LICENSE) [![Node.js CI](https://img.shields.io/github/workflow/status/recifejs/recife-express/Node.js%20CI?style=flat-square&logo=github)](https://github.com/recifejs/recife-express/workflows/Node.js%20CI)

Recife Express is a integration of recifejs with [express](https://expressjs.com/). For more details access the [documentation](https://recifejs.org/).

## Install

```bash
npm install recife-express
# or
yarn add recife-express
```

## Using in RecifeJs project

Open file `config/app.ts` and insert the value `express` in the property `httpFramework`:

```ts
import { AppConfig } from 'recife';

export const config: AppConfig = {
  // ...
  httpFramework: 'express'
  // ...
};
```

## License

Recife Express is open source software [licensed as MIT](https://github.com/recifejs/recife-express/blob/master/LICENSE).
