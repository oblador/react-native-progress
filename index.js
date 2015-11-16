'use strict';

var Bar = require('./Bar');
var Circle = require('./Circle');
var Pie = require('./Pie');
var CircleSnail = require('./CircleSnail');
var makeAnimatable = require('./makeAnimatable');

module.exports = {
  Bar,
  Circle: makeAnimatable(Circle),
  Pie: makeAnimatable(Pie, 0.2),
  CircleSnail: CircleSnail,
};
