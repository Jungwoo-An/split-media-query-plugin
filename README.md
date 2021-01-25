<h3 align="center">split-media-query-plugin</h3>
<p align="center">Webpack plugin for splitting media query into multiple css files</p>

## Introduction

_Experimental repository_

**Examples**

- [Bootstrap](https://github.com/Jungwoo-An/split-media-query-plugin/tree/master/example)

## Getting Started

### Prerequisites

- webpack >= 4
- html-webpack-plugin >=4

### Installation

```bash
# via npm
$ npm install -D split-media-query-plugin

# via yarn
$ yarn add -D split-media-query-plugin
```

## Usage

```ts
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SplitMediaQueryPlugin = require('split-media-query-plugin');

module.exports = {
  // ...
  plugins: [new HtmlWebpackPlugin(), new SplitMediaQueryPlugin()],
};
```

**input**

```css
html {
  font-size: 14px;
}

@media (max-width: 767px) {
  html {
    font-size: 10px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  html {
    font-size: 11px;
  }
}

@media (min-width: 1024px) {
  html {
    font-size: 12px;
  }
}
```

**output**

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="main.css" />
    <link rel="stylesheet" href="main1.css" media="(max-width: 767px)" />
    <link
      rel="stylesheet"
      href="main2.css"
      media="(min-width: 768px) and (max-width: 1023px)"
    />
    <link rel="stylesheet" href="main3.css" media="(min-width: 1024px)" />
  </head>
  <body></body>
</html>
```
