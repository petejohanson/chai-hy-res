'use strict';

/*jshint expr: true*/

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

    new Assertion(obj).to.have.property('$promise').not.null;

    if(utils.flag(this,'chai-hy-res:unresolved')) { new Assertion(obj).to.have.property('$resolved').be.false;
      new Assertion(obj).to.have.property('$error').be.null;
    }

    if(utils.flag(this,'chai-hy-res:resolved')) {
      new Assertion(obj).to.have.property('$resolved').be.true;
      new Assertion(obj).to.have.property('$error').be.null;
      new Assertion(obj).to.eql(obj);
    }
  });

  utils.addMethod(Assertion.prototype, 'link', function(rel) {
    var obj = this._obj;

    var link = obj.$link(rel);

    var linkAssertion = new Assertion(link);
    // Transfer flags so a previous negation will work as expected.
    utils.transferFlags(this, linkAssertion, false);
    linkAssertion.to.exist;

    utils.flag(this, 'object', link);
  });
};
