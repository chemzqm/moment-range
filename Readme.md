[![Build Status](https://secure.travis-ci.org/chemzqm/moment-range.png)](http://travis-ci.org/chemzqm/moment-range)

# moment-range

  date range representing with moment inside.

## Installation

  Install with [component(1)](http://component.io):

    $ component install chemzqm/moment-range

  Install with npm:

    $ npm install moment-range

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

### .within(MomentRange)

  Check if this range obj is a subset of `MomentRange`.

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
