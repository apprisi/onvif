// Generated by CoffeeScript 1.9.2
(function() {
  var _cropName, _linerase, assert, parseString;

  _linerase = (require('../lib/soapHelpers'))._linerase;

  _cropName = (require('../lib/soapHelpers'))._cropName;

  assert = require('assert');

  parseString = (require('xml2js')).parseString;

  describe('linerase function', function() {
    it('should handle tag', function(done) {
      return parseString('<a><b>text</b><c>text</c></a>', function(err, result) {
        assert.deepEqual(_linerase(result), {
          a: {
            b: 'text',
            c: 'text'
          }
        });
        return done();
      });
    });
    it('should handle multiply tags', function(done) {
      return parseString('<a><b>text</b><b>text</b></a>', function(err, result) {
        assert.deepEqual(_linerase(result), {
          a: {
            b: ['text', 'text']
          }
        });
        return done();
      });
    });
    it('should handle multiply tags deeply', function(done) {
      return parseString('<a><b><c>text</c><d>t</d></b><b><c>text</c><d>t</d></b></a>', function(err, result) {
        assert.deepEqual(_linerase(result), {
          a: {
            b: [
              {
                c: 'text',
                d: 't'
              }, {
                c: 'text',
                d: 't'
              }
            ]
          }
        });
        return done();
      });
    });
    it('should deals with numbers', function() {
      assert.deepEqual(_linerase({
        a: '34.23'
      }), {
        a: 34.23
      });
      assert.deepEqual(_linerase({
        a: '34'
      }), {
        a: 34
      });
      assert.deepEqual(_linerase({
        a: '0.34'
      }), {
        a: 0.34
      });
      assert.deepEqual(_linerase({
        a: '00.34'
      }), {
        a: '00.34'
      });
      assert.deepEqual(_linerase({
        a: '-0.34'
      }), {
        a: -0.34
      });
      assert.deepEqual(_linerase({
        a: '-12'
      }), {
        a: -12
      });
      assert.deepEqual(_linerase({
        a: '000'
      }), {
        a: '000'
      });
      return assert.deepEqual(_linerase({
        a: '012'
      }), {
        a: '012'
      });
    });
    return it('should deals with datetime and not converts it to number', function() {
      return assert.deepEqual(_linerase({
        a: '2015-01-20T16:33:03Z'
      }), {
        a: '2015-01-20T16:33:03Z'
      });
    });
  });

}).call(this);

//# sourceMappingURL=_linerase.js.map
