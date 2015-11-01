'use strict';

var Bar = require('./Bar');
var Circle = require('./Circle');
var Pie = require('./Pie');
var makeAnimatable = require('./makeAnimatable');

module.exports = {
  Bar,
  Circle: makeAnimatable(Circle),
  Pie: makeAnimatable(Pie, 0.2),
};
