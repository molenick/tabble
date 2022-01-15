[![Jasmine Specs](https://github.com/molenick/tabble/actions/workflows/jasmine.js.yml/badge.svg)](https://github.com/molenick/tabble/actions/workflows/jasmine.js.yml)
[![Playwright Tests](https://github.com/molenick/tabble/actions/workflows/playwright.yml/badge.svg)](https://github.com/molenick/tabble/actions/workflows/playwright.yml)
# Tabble
A simple, framework-agnostic accessiblity tool for managing HTML element tabindices

## Install

```sh
npm install tabble
```

## Try the demo

Visit the hosted [demo page](https://molenick.github.io/tabble). For more info, please see the [demo readme](demo/README.md).

## Usage Example:

Given a document:
```html
<html lang="en">
  <body>
    <main>
      <section class="page">
        <a href="#">Link</a>
        <textarea></textarea>
        <button>Submit</button>
      </section>
      <section class="overlay">
        <input>
        <button>Submit</button>
      </section>
    </main>
  </body>
</html>
```

Create an instance with configuration:
```javascript
import Tabble from 'tabble'

const page = document.querySelector('.page')
const config = {
  disable: ['.page *'],
  ignore: ['.overlay *']
}

const tabble = new Tabble(page, config)
```

Record the document's tabindex properties:
```javascript
tabble.record()
```

Disable specificied selectors:
```javascript
tabble.disable()
```

Changes the tabindex of each matching element that does not match ignored elements:
```html
<html>
  <body>
    <main>
      <section class="page">
        <a tabindex="-1" href="#">Link</a>
        <textarea tabindex="-1"></textarea>
        <button tabindex="-1">Submit</button>
      </section>
      <section class="overlay">
        <input>
        <button>Submit</button>
      </section>
    </main>
  </body>
</html>
```

Restore the document back to its original state:

```javascript
tabble.restore()
```

## Development

### Run Jasmine specs

```sh
npm test
````

### Run Playwright tests

```sh
npx playwright test
````

### Lint source
```sh
npx eslint .
```
