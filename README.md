# generator-express-mongo [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Basic express with mongoDb

## Installation

First, install [Yeoman](http://yeoman.io) and generator-express-mongo using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-express-mongo
```

Then generate your new project:

```bash
yo express-mongo
```

## File Structure
```
  |
  |-->models
  |     |--> modelSchema.js
  |     |--> index.js
  |-->policies
  |     |--> policy.js
  |     |--> index.js
  |-->routes
  |     |--> route.js
  |     |--> index.js
  |-->static
  |     |--> index.html
  |-->index.js
  |-->package.json
  |-->.env
  |-->.gitignore
  
```
## License

Apache-2.0 © [Shubham Awasthi](awasthishubh.github.io)


[npm-image]: https://badge.fury.io/js/generator-express-mongo.svg
[npm-url]: https://npmjs.org/package/generator-express-mongo
[travis-image]: https://travis-ci.org/awasthishubh/generator-express-mongo.svg?branch=master
[travis-url]: https://travis-ci.org/awasthishubh/generator-express-mongo
[daviddm-image]: https://david-dm.org/awasthishubh/generator-express-mongo.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/awasthishubh/generator-express-mongo
