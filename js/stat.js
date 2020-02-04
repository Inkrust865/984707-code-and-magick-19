'use strict';

var Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10
};
var Phrase = {
  HEIGHT: 16,
  GAP_X: 20,
  GAP_Y: 20
};
var Column = {
  HEIGHT: 150,
  WIDTH: 40,
  GAP: 50
};
var textX = Cloud.X + Phrase.GAP_X;
var textY = Cloud.Y + Phrase.GAP_Y;
var captionY = Cloud.Y + Cloud.HEIGHT - Phrase.GAP_Y;
var SHADOW_GAP = 10;
var HISTOGRAM_GAP = 40;
var COLOR_TEXT = '#000';
var COLOR_PLAYER = 'rgba(255, 0, 0, 1)';
var COLOR_SHADOW = 'rgba(0, 0, 0, 0.7)';
var COLOR_CLOUD = '#fff';
var FONT = 'PT Mono';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

var createCloud = function (ctx) {
  renderCloud(ctx, Cloud.X + SHADOW_GAP, Cloud.Y + SHADOW_GAP, COLOR_SHADOW);
  renderCloud(ctx, Cloud.X, Cloud.Y, COLOR_CLOUD);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderText = function (ctx, textCloud, textHeight) {
  ctx.fillText(textCloud, textX, textY + textHeight);
};

var createText = function (ctx) {
  ctx.fillStyle = COLOR_TEXT;
  ctx.font = Text.HEIGHT + 'px' + FONT;
  ctx.textBaseline = 'hanging';

  renderText(ctx, 'Ура вы победили!', 0);
  renderText(ctx, 'Список результатов: ', Phrase.HEIGHT);
};

var renderValueColumn = function (ctx, value, valueX, valueY) {
  ctx.fillText(value, valueX, valueY);
};

var renderCaptionColumn = function (ctx, caption, captionX) {
  ctx.fillText(caption, captionX, captionY);
};

var colorColumn = function (ctx, captionColumn) {
  if (captionColumn === 'Вы') {
    ctx.fillStyle = COLOR_PLAYER;
  } else {
    ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
  }
};

var renderColumn = function (ctx, columnX, columnY, columnHeight) {
  ctx.fillRect(columnX, columnY, Column.WIDTH, columnHeight);
};

var createHistogram = function (ctx, columnNumber, columnTimes, columnNames, columnMaxTime) {
  ctx.fillStyle = COLOR_TEXT;

  var valueColumnX = Cloud.X + HISTOGRAM_GAP + (Column.WIDTH + Column.GAP) * columnNumber;
  var valueColumnY = Cloud.Y + Cloud.HEIGHT - Phrase.GAP_X - Phrase.HEIGHT * 2 - (Column.HEIGHT * columnTimes[columnNumber]) / columnMaxTime;
  renderValueColumn(ctx, Math.floor(columnTimes[columnNumber]), valueColumnX, valueColumnY);

  var captionColumnX = Cloud.X + HISTOGRAM_GAP + (Column.WIDTH + Column.GAP) * columnNumber;
  renderCaptionColumn(ctx, columnNames[columnNumber], captionColumnX);

  colorColumn(ctx, columnNames[columnNumber]);

  var histogramColumnX = Cloud.X + HISTOGRAM_GAP + (Column.WIDTH + Column.GAP) * columnNumber;
  var histogramColumnY = Cloud.Y + Cloud.HEIGHT - Phrase.GAP_X - Phrase.HEIGHT - (Column.HEIGHT * columnTimes[columnNumber]) / columnMaxTime;
  var histogramColumnHeight = (Column.HEIGHT * columnTimes[columnNumber]) / columnMaxTime;
  renderColumn(ctx, histogramColumnX, histogramColumnY, histogramColumnHeight);
};

window.renderStatistics = function (ctx, names, times) {
  createCloud(ctx);
  createText(ctx);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    createHistogram(ctx, i, times, names, maxTime);
  }
};

