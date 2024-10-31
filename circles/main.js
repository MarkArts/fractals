var width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

var height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

//params
var circleSize = width >= height ? height : width;
var speed = 0.25; // loop per sec
var fps = 60;
//

//vars
var circles = generateCircles();
var updateSpeed = 1000 / fps;

canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
var style = canvas.style;
style.marginLeft = "auto";
style.marginRight = "auto";
var parentStyle = canvas.parentElement.style;
parentStyle.textAlign = "center";
parentStyle.width = "100%";

context = canvas.getContext("2d");

function splitCircle(x, y, size) {
  var circles = [];

  circles.push([x - size / 2, y - size / 2, size / 4]);
  circles.push([x + size / 2, y - size / 2, size / 4]);
  circles.push([x - size / 2, y + size / 2, size / 4]);
  circles.push([x + size / 2, y + size / 2, size / 4]);
  circles.push([x, y, size / 2]);
  circles.push([x, y, size / 4]);

  return circles;
}

function splitCircles(circles) {
  var newCircles = [];
  for (var i = 0; i < circles.length; i++) {
    var _circles = splitCircle(circles[i][0], circles[i][1], circles[i][2]);
    rotateCircles(_circles, circles[i][0], circles[i][1], i * 5);
    newCircles = [...newCircles, ..._circles];
  }

  return newCircles;
}

function drawCircles(circles) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  for (var i = circles.length - 1; i >= 0; i--) {
    context.moveTo(circles[i][0] + circles[i][2] / 2, circles[i][1]);
    context.arc(
      circles[i][0],
      circles[i][1],
      circles[i][2] / 2,
      0,
      2 * Math.PI,
      false,
    );
  }
  context.stroke();
  context.closePath();
}

function zoomCircles(circles, x, y, zoom) {
  var x = cursorX;
  var y = cursorY;

  for (var i = circles.length - 1; i >= 0; i--) {
    circles[i][0] = (circles[i][0] - x) * zoom + x;
    circles[i][1] = (circles[i][1] - y) * zoom + y;
    circles[i][2] = circles[i][2] * zoom;
  }
}

function rotateCircles(circles, x, y, angle) {
  for (var i = circles.length - 1; i >= 0; i--) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);

    // translate point back to origin:
    circles[i][0] -= x;
    circles[i][1] -= y;

    // rotate point
    var xnew = circles[i][0] * c - circles[i][1] * s;
    var ynew = circles[i][0] * s + circles[i][1] * c;

    // translate point back:
    circles[i][0] = xnew + x;
    circles[i][1] = ynew + y;
  }
}

function cleanCircles(circles) {
  var newCircles = [];
  for (var i = circles.length - 1; i >= 0; i--) {
    if (
      circles[i][0] > 0 &&
      circles[i][0] <= canvas.width &&
      circles[i][1] > 0 &&
      circles[i][1] <= canvas.height
      //&& circles[i][2] > circleSize / 2000 // 694
    ) {
      newCircles.push([circles[i][0], circles[i][1], circles[i][2]]);
    }
  }
  return newCircles;
}

function generateCircles() {
  var circles = [[width / 2, height / 2, circleSize]];

  circles = splitCircles(circles);
  circles = splitCircles(circles);
  circles = splitCircles(circles);
  circles = splitCircles(circles);
  //circles = cleanCircles(circles);

  return circles;
}

var lastUpdate = Date.now();
var maxCircles = 2000;
setInterval(function () {
  var now = Date.now();
  var dt = now - lastUpdate;
  var dt = dt / 1000;
  lastUpdate = now;

  zoomCircles(
    circles,
    circleSize / 2,
    circleSize / 2,
    1 + ((speed * 2) / 1.4125) * dt,
  );

  console.log(circles.length);

  circles = cleanCircles(circles);
  if (maxCircles > circles.length * 5) {
    circles = splitCircles(circles);
  }

  rotateCircles(circles, circleSize / 2, circleSize / 2, -dt * 0.1);

  drawCircles(circles);
}, updateSpeed);

// fuck the browser
var cursorX = circleSize / 2;
var cursorY = circleSize / 2;
document.onmousemove = function (e) {
  cursorX = e.pageX;
  cursorY = e.pageY;
};
