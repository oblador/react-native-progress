'use strict';

var Bar = require('./Bar');
var Circle = require('./Circle');
var makeAnimatable = require('./makeAnimatable');

module.exports = {
  Bar,
  Circle: makeAnimatable(Circle),
};
