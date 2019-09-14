'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#ffffff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var GAP = 10;

var FONT_X = GAP * 2;
var FONT_Y = GAP * 4;
var FONT_GAP = 20;
var FONT_COLOR = '#000000';

var BAR_X = CLOUD_X + FONT_X * 2;
var BAR_Y = CLOUD_Y + CLOUD_HEIGHT - FONT_Y / 2 - FONT_GAP;
var BAR_WIDTH = 40;
var BAR_MAXHEIGHT = 150;
var BAR_GAP = 50;
var barHeight = BAR_MAXHEIGHT;

var renderRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (array) {
  var maxElement = array[0];
  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);
  var barColor;

  renderRect(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOR);
  renderRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);

  ctx.fillStyle = FONT_COLOR;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_X, FONT_Y);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_X, FONT_Y + FONT_GAP);

  for (var i = 0; i < names.length; i++) {
    var currentTime = Math.round(times[i]);
    barHeight = currentTime * BAR_MAXHEIGHT / maxTime;

    if (names[i] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    } else {
      barColor = 'hsl(230,' + Math.floor(Math.random() * 100) + '%,50%)';
    }

    ctx.fillText(names[i], CLOUD_X + FONT_X * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_Y / 2);
    renderRect(ctx, BAR_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y, BAR_WIDTH, -barHeight, barColor);
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(currentTime, CLOUD_X + FONT_X * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_Y / 2 - barHeight - FONT_GAP * 1.2);
  }
};
