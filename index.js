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

MomentRange.prototype.getDates = function (format) {
  if (!this._from || !this._to) throw new Error('start date/end date not defined');
  var res = [];
  var d = this._from;
  while(!d.isAfter(this._to)) {
    var o = format ? d.format(format) : d.clone();
    res.push(o);
    d = d.add('days', 1);
  }
  return res;
}

MomentRange.prototype.intersect = function (range) {
  var f = range.from();
  var t = range.to();
  return !(this._from.isAfter(t) || this._to.isBefore(f));
}

MomentRange.prototype.equal = function (range) {
  var f = range.from();
  var t = range.to();
  return this._from.isSame(f) && this._to.isSame(t);
}

MomentRange.prototype.diff = function (unit) {
  return this._to.diff(this._from, unit);
}

MomentRange.prototype.each = function (unit, fn) {
  if (arguments.length < 2) {
    fn = unit;
    unit = 'days';
  }
  var d = this._from, i = 0;
  while(this.include(d)){
    fn(d.clone(), i);
    d = d.add(unit, 1);
    i++;
  }
}

MomentRange.prototype.within = function (range) {
  if (!this._from || !this._to) throw new Error('start date/end date not defined');
  var f = this._from;
  var t = this._to;
  return f.isAfter(range.from()) && t.isBefore(range.to());
}

MomentRange.prototype.include = function (date) {
  var d = moment(date);
  return (!d.isBefore(this._from)) && (!d.isAfter(this._to));
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
