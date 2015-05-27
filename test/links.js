'use strict';

require('es6-promise').polyfill();

var chai = require('chai');
chai.use(require('../'));
chai.use(require('chai-as-promised'));

var expect = chai.expect;

var hr = require('hy-res');

describe('link assertions', function() {
  var resource;

  beforeEach(function() {
    var http = sinon.stub();
    http.returns(Promise.resolve({headers: {'content-type': 'application/hal+json' }, data: { _links: { next: { href: '/posts/123' } } }}));
    resource = new hr.Root('/', http, [new hr.HalExtension]).follow();
  });

  it('asserts on the presence of a link', function() {
    return expect(resource.$promise).to.eventually.have.a.link('next');
  });

  it('allows asserting on not having a link', function() {
    return expect(resource.$promise).to.eventually.not.have.a.link('prev');
  });

  it('allows asserting on properties of the link', function() {
    return expect(resource.$promise).to.eventually.have.a.link('next').property('href', '/posts/123');
  });
});
