'use strict';

/*jshint expr: true*/

//var HyRes = require('hy-res');

module.exports = function(chai, utils) {
  var Assertion = chai.Assertion;
  Assertion.addProperty('resolved', function() {
    utils.flag(this,'chai-hy-res:resolved', true);
    return this;
  });

  Assertion.addProperty('unresolved', function() {
    utils.flag(this,'chai-hy-res:unresolved', true);
    return this;
  });

  Assertion.addProperty('resource', function() {
    var obj = this._obj;
/*
    var instanceAssertion = new chai.Assertion(this._obj);
    utils.transferFlags(this, instanceAssertion, false);
    instanceAssertion.to.be.instanceof(HyRes.Resource);
*/

    new Assertion(obj).to.have.property('$promise').not.null;

    if(utils.flag(this,'chai-hy-res:unresolved')) {
      new Assertion(obj).to.have.property('$resolved').be.false;
      new Assertion(obj).to.have.property('$error').be.null;
    }

    if(utils.flag(this,'chai-hy-res:resolved')) {
      new Assertion(obj.$promise).to.eventually.have.property('$resolved').be.true;
      new Assertion(obj.$promise).to.eventually.have.property('$error').be.null;
      new Assertion(obj.$promise).to.eventually.eql(obj);
    }
  });
};