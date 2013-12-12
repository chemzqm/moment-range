[![NPM version](https://badge.fury.io/js/moment-ranger.png)](http://badge.fury.io/js/moment-ranger)
[![Dependency Status](https://david-dm.org/chemzqm/moment-range.png)](https://david-dm.org/chemzqm/moment-range)
[![Build Status](https://secure.travis-ci.org/chemzqm/moment-range.png)](http://travis-ci.org/chemzqm/moment-range)
[![Coverage Status](https://coveralls.io/repos/chemzqm/moment-range/badge.png?branch=master)](https://coveralls.io/r/chemzqm/moment-range?branch=master)

# moment-range

  date range representing with moment inside.

## Installation

  Install with [component(1)](http://component.io):

    $ component install chemzqm/moment-range

  Install with npm:

    $ npm install moment-ranger

## Example

``` js
var range = new MomentRange('2013-11-06', '2013-11-22');
range.each(function(moment){
  console.log(moment.format('YYYY-MM-DD')) //log each days within the range
})
```

## API

### MomentRange([from, to])
  
  Initialize a new MomentRange with optional `from` and `to`, if `from` is bigger than `to`,
  they will be normalized so that `from` always the smallest date.

### .from(String|Number|Date|Array)

  Set / get the `from` moment date.

### .to(String|Number|Date|Array)

  Set / get the `to` moment date.

### .intersect(MomentRange)

  Check if this range intersect with other moment range.

### .equal(MomentRange)

  Check if this range is the same as other moment range.

### .diff([unit])

  Get the difference in milisecond or the given unit(could be `years`, `months`, `weeks`, `days`, `hours`, `minutes`, and `seconds`).

### .within(MomentRange)

  Check if this range obj is a subset of `MomentRange`.

### .each([unit], fn)

  Call the fn with all the `moment` divided by unit (default is `days`, all available unit is the same as diff method) and index.

### .include(String|Number|Date|Array)

  Check if MomentRange contains the date.

### .getDates([format])

  Get all the moment dates array or formatted string array within the date range.

### .toJSON()

  Return the json representation.

### .toString()

  Return the string representation.

## License

  MIT
