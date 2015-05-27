'use strict';

require('es6-promise').polyfill();

var chai = require('chai');
chai.use(require('../'));
chai.use(require('chai-as-promised'));

var expect = chai.expect;

var axios = require('axios');
var hr = require('hy-res');

describe('resource assertions', function() {
  describe('unresolved', function() {
    var resource;

    beforeEach(function() {
      resource = new hr.Root('http://fake.com/api', axios, []).follow();
    });

    it('asserts on an unresolved resource', function() {
      expect(resource).to.be.an.unresolved.resource;
    });
  });

  describe('resolved', function() {
    var resource;

    beforeEach(function() {
      resource = new hr.Root('./', axios, []).follow();
    });

    it('asserts on a resolved resource', function() {
      expect(resource.$promise).to.eventually.be.a.resolved.resource;
    });
  });
});
