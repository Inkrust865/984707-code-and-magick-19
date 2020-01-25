'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var TEXT_GAP_X = 20;
var TEXT_GAP_Y = 30;
var TEXT_HEIGHT = 16;
var HISTOGRAM_GAP = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = TEXT_HEIGHT + 'px PT_Mono';
  ctx.textBaseline = 'haning';

  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_GAP_X, CLOUD_Y + TEXT_GAP_Y);
  ctx.fillText('Список результатов: ', CLOUD_X + TEXT_GAP_X, CLOUD_Y + TEXT_GAP_Y + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {

    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + HISTOGRAM_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP_X - TEXT_HEIGHT * 2 - (COLUMN_HEIGHT * times[i]) / maxTime);
    ctx.fillText(names[i], CLOUD_X + HISTOGRAM_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP_X);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
    }
    ctx.fillRect(CLOUD_X + HISTOGRAM_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP_X - TEXT_HEIGHT - (COLUMN_HEIGHT * times[i]) / maxTime, COLUMN_WIDTH, (COLUMN_HEIGHT * times[i]) / maxTime);
  }
};

