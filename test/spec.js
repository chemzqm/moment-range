/* global describe,it*/
var expect = require('chai').expect;
var moment = require('moment');
var MomentRange = require('..');

var from = '2013-11-06';
var to = '2013-11-11';

describe('MomentRange(from, to)', function() {

  it('should initialize the range', function() {
    var range = new MomentRange(from, to);
    expect(range.from().format('YYYY-MM-DD')).to.equal(from);
    expect(range.to().format('YYYY-MM-DD')).to.equal(to);
  })

  it('should work without new', function() {
    var range = MomentRange(from, to);
    expect(range.from().format('YYYY-MM-DD')).to.equal(from);
    expect(range.to().format('YYYY-MM-DD')).to.equal(to);
  })

  it('should be optional', function() {
    var range = MomentRange();
    expect(range.from()).to.be.undefined;
    expect(range.to()).to.be.undefined;
    range.from(from);
    range.to(to);
    expect(range.from().format('YYYY-MM-DD')).to.equal(from);
    expect(range.to().format('YYYY-MM-DD')).to.equal(to);
  })

  it('should be normalized', function() {
    var range = MomentRange(to, from);
    expect(range.from().format('YYYY-MM-DD')).to.equal(from);
    expect(range.to().format('YYYY-MM-DD')).to.equal(to);
  })
})

describe('MomentRange#within', function() {
  it('should be within the range', function() {
    var range = MomentRange(from, to);
    var f = moment(from).add('days', 1);
    var t = moment(to).subtract('days', 1);
    var subRange = MomentRange(f, t);
    expect(subRange.within(range)).to.be.true;
  })
})

describe('MomentRange#include', function() {
  it('should include the date', function() {
    var range = MomentRange(from, to);
    var d = '2013-11-10';
    expect(range.include(d)).to.be.true;
  })

  it('should not include the date', function() {
    var range = MomentRange(from, to);
    var d = '2013-12-10';
    expect(range.include(d)).to.be.false;
  })
})

describe('MomentRange#getDates', function() {
  it('should get the moment date array', function() {
    var range = MomentRange(from, to);
    var dates = range.getDates('YYYY-MM-DD');
    expect(dates).to.eql([ '2013-11-06', '2013-11-07', '2013-11-08', '2013-11-09', '2013-11-10', '2013-11-11' ]);
  })
})

describe('MomentRange#intersect', function() {
  it('should intersect with other range', function() {
    var range = new MomentRange(from, to);
    var f = moment(from).add('days', 1);
    var t = moment(to).add('days', 10);
    var oRange = new MomentRange(f, t);
    expect(range.intersect(oRange)).to.be.true;
  })

  it('should not intersect with other range', function() {
    var range = new MomentRange(from, to);
    var f = moment(to).add('days', 1);
    var t = moment(to).add('days', 10);
    var oRange = new MomentRange(f, t);
    expect(range.intersect(oRange)).to.be.false;
  })
})

describe('MomentRange#toJSON', function() {
  it('should return a json representation', function() {
    var range = MomentRange(from, to);
    var json = JSON.stringify(range);
    var obj = JSON.parse(json);
    expect(obj.from).to.exist;
    expect(obj.to).to.exist;
  })
})

describe('MomentRange#toString', function() {
  it('should return a string representation', function() {
    var range = MomentRange(from, to);
    expect(range.toString().indexOf('[MomentRange')).to.eql(0);
  })
})
