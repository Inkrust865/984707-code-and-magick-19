'use strict';

var cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10
};
var text = {
  HEIGHT: 16,
  GAP_X: 20,
  GAP_Y: 20
};
var column = {
  HEIGHT: 150,
  WIDTH: 40,
  GAP: 50
};
var textX = cloud.X + text.GAP_X;
var textY = cloud.Y + text.GAP_Y;
var captionY = cloud.Y + cloud.HEIGHT - text.GAP_Y;
var SHADOW_GAP = 10;
var HISTOGRAM_GAP = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloud.WIDTH, cloud.HEIGHT);
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

var renderValueColumn = function (ctx, value, valueX, valueY) {
  ctx.fillText(value, valueX, valueY);
};

var renderCaptionColumn = function (ctx, caption, captionX) {
  ctx.fillText(caption, captionX, captionY);
};

var colorColumn = function (ctx, captionColumn) {
  if (captionColumn === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
  }
};

var renderColumn = function (ctx, columnX, columnY, columnHeight) {
  ctx.fillRect(columnX, columnY, column.WIDTH, columnHeight);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloud.X + SHADOW_GAP, cloud.Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, cloud.X, cloud.Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = text.HEIGHT + 'px PT Mono';
  ctx.textBaseline = 'hanging';

  renderText(ctx, 'Ура вы победили!', 0);
  renderText(ctx, 'Список результатов: ', text.HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';

    var valueColumnX = cloud.X + HISTOGRAM_GAP + (column.WIDTH + column.GAP) * i;
    var valueColumnY = cloud.Y + cloud.HEIGHT - text.GAP_X - text.HEIGHT * 2 - (column.HEIGHT * times[i]) / maxTime;
    renderValueColumn(ctx, Math.floor(times[i]), valueColumnX, valueColumnY);

    var captionColumnX = cloud.X + HISTOGRAM_GAP + (column.WIDTH + column.GAP) * i;
    renderCaptionColumn(ctx, names[i], captionColumnX);

    colorColumn(ctx, names[i]);

    var histogramColumnX = cloud.X + HISTOGRAM_GAP + (column.WIDTH + column.GAP) * i;
    var histogramColumnY = cloud.Y + cloud.HEIGHT - text.GAP_X - text.HEIGHT - (column.HEIGHT * times[i]) / maxTime;
    var histogramColumnHeight = (column.HEIGHT * times[i]) / maxTime;
    renderColumn(ctx, histogramColumnX, histogramColumnY, histogramColumnHeight);
  }
};

