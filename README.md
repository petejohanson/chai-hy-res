# chai-hy-res [![Build Status](https://travis-ci.org/petejohanson/chai-hy-res.svg?branch=master)](https://travis-ci.org/petejohanson/chai-hy-res)

A [ChaiJs](http://chaijs.com/) plugin for making assertions about [hy-res](https://github.com/petejohanson/hy-res) 

## Installation

### NPM

chai-hy-res is available via NPM. To install:

    $ npm install --save-dev chai-hy-res

## Setup

```javascript
var chai = require('chai');
chai.use(require('chai-hy-res'));
```

## Usage

### Resource State Assertions

There are several assertions about the state of a `hy-res` resource being
resolved or unresolved.

Asserting an unresolved resource:

```javascript
expect(res.$followOne('next')).to.be.an.unresolved.resource;
```

For asserting resolved resource, it is often helpful to use the plugin in
combination with (chai-as-promised)[http://chaijs.com/plugins/chai-as-promised]:

```
expect(res.$followOne('next').$promise).to.eventually.be.a.resolved.resource;
```

