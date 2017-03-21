/**
* Creates a range of numbers in an array, starting at a specified number and
* ending before a different specified number.
* @param {number} start  Indicates what number should be used as the first
*     number in the returned array.  If this is the only number argument
*     supplied, this will be used as the edge and 0 will be used as the start.
* @param {number=} edge  Indicates the first number that should not appear in
*     the range of numbers.  If this number preceeds the start in the range
*     (taking into account the step), an empty array will be returned.  If not
*     specified and not inferred this defaults to 0.
* @param {number=} step  Indicates the difference between one number and the
*     subsequent number placed in the returned array.  If not specified this
*     defaults to 1.
* @return {!Array.<number>}  Array of numbers in the specified range.
*/
export default function range(start, edge, step) {
  // If only one number was passed in make it the edge and 0 the start.
  if (arguments.length === 1) {
    edge = start
    start = 0
  }

  // Validate the edge and step numbers.
  edge = edge || 0
  step = step || 1

  // Create the array of numbers, stopping befor the edge.
  for (var ret = []; (edge - start) * step > 0; start += step) {
    ret.push(start)
  }
  return ret
}
