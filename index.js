var moment = require('moment');

function MomentRange(from, to) {
  if (!(this instanceof MomentRange)) return new MomentRange(from, to);
  if (from) this.from(from);
  if (to) this.to(to);
}

MomentRange.prototype.from = function (date) {
  if (0 === arguments.length) return this._from;
  this._from = moment(date);
  this.normalize();
}

MomentRange.prototype.to = function (date) {
  if (0 === arguments.length) return this._to;
  this._to = moment(date);
  this.normalize();
}

MomentRange.prototype.normalize = function () {
  if (this._from.isAfter(this._to)) {
    var from = this._from;
    this._from = this._to;
    this._to = from;
  }
}

MomentRange.prototype.getDates = function () {
  if (!this._from || !this._to) throw new Error('start date/end date not defined');
  var res = [];
  var d = this._from;
  while(!d.isAfter(this._to)) {
    res.push(d);
    d = d.add('days', 1);
  }
  return res;
}

MomentRange.prototype.within = function (range) {
  if (!this._from || !this._to) throw new Error('start date/end date not defined');
  var f = this._from;
  var t = this._to;
  return f.isAfter(range.from()) && t.isBefore(range.to());
}

MomentRange.prototype.contains = function (date) {
  var d = moment(date);
  return d.isAfter(this._from) && d.isBefore(this._to);
}

MomentRange.prototype.toJSON = function () {
  return {
    from : this._from.toDate(),
    to: this._to.toDate()
  }
}

MomentRange.prototype.toString = function () {
  return '[MomentRange: ' + this._from.format('YYYY-MM-DD')
          + ' - ' + this._to.format('YYYY-MM-DD') + ']';
}

module.exports = MomentRange;
