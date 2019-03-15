# generator-express-mongo [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A scaffolding tool that will create a bootstrap code for starting with a basic express-mongo server.

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
## Screenshots
<img src="https://github.com/awasthishubh/generator-express-mongo/blob/master/screenshots/Screenshot%20from%202019-03-12%2014-07-07.png" width="400px">
<img src="https://github.com/awasthishubh/generator-express-mongo/blob/master/screenshots/Screenshot%20from%202019-03-12%2014-07-40.png" width="400px">
<img src="https://github.com/awasthishubh/generator-express-mongo/blob/master/screenshots/Screenshot%20from%202019-03-12%2014-10-17.png" width="400px">
<img src="https://github.com/awasthishubh/generator-express-mongo/blob/master/screenshots/Screenshot%20from%202019-03-12%2014-14-17.png" width="400px">


## License

Apache-2.0 © [Shubham Awasthi](awasthishubh.github.io)


[npm-image]: https://badge.fury.io/js/generator-express-mongo.svg
[npm-url]: https://npmjs.org/package/generator-express-mongo
[travis-image]: https://travis-ci.org/awasthishubh/generator-express-mongo.svg?branch=master
[travis-url]: https://travis-ci.org/awasthishubh/generator-express-mongo
[daviddm-image]: https://david-dm.org/awasthishubh/generator-express-mongo.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/awasthishubh/generator-express-mongo
