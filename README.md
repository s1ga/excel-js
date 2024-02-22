# Excel.js

This is a project developed on a plain JavaScript without any library except Webpack (as module bundler) and ESLint (as linter). The functionality of the application is a implementation of the basic features of Google Sheets / Microsoft Excel.

## Conditions

Installed [Node.js](https://nodejs.org/en/download) (better use v10.24.1 for compatibility).

## Preparation

1. Clone a repo
`git clone https://github.com/s1ga/excel-js.git`
2. Go to directory `cd excel-js/`
3. Install dependencies `npm ci`

## Start

Run `npm run start` to start a live server on `localhost:3030`. The application will automatically reload if you change any of the source files.

## Lint

Run `npm run lint` to lint the application.

## Test

Run `npm run test` to execute the unit tests via Jest.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
