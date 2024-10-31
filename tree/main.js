var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 10;
camera.position.y = 10;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// var controls = new THREE.OrbitControls(camera, renderer.domElement);

// smooth my curve over this many points
var numPoints = 20;

function createLine(x, y, length, zrad, mirror) {
  var curvePoint = mirror ? length / 8 : -length / 8;

  var points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(curvePoint, length * 0.75, 0),
    new THREE.Vector3(0, length, 0),
  ];

  var spline = new THREE.SplineCurve(points);

  var material = new THREE.LineBasicMaterial({
    color: 0xff00f0,
  });

  var geometry = new THREE.BufferGeometry();
  var splinePoints = spline.getPoints(numPoints);

  for (var i = 0; i < splinePoints.length; i++) {
    geometry.vertices.push(splinePoints[i]);
  }

  var line = new THREE.Line(geometry, material);

  line.position.x = x;
  line.position.y = y;
  line.rotation.z = zrad;

  // i am way to lazy right now to program this properly
  // lines should probaply be created from a array with minimum representation of the lines
  line.length = length;

  return line;
}

function splitLine(line) {
  var lines = [];

  console.log(line.rotation.z * (180 / Math.PI));

  var sidea = Math.sin(line.rotation.z) * line.length;
  var sideb = Math.cos(line.rotation.z) * line.length;

  var endX = line.position.x - sidea;
  var endY = line.position.y + sideb;

  lines.push(
    createLine(
      endX,
      endY,
      line.length / 1.3,
      line.rotation.z - 45 * (Math.PI / 180),
    ),
  );
  lines.push(
    createLine(
      endX,
      endY,
      line.length / 1.3,
      line.rotation.z + 45 * (Math.PI / 180),
    ),
  );

  return lines;
}

function splitRec(line, times) {
  if (times == 0) {
    return [line];
  }

  var lines = splitLine(line);

  return [line]
    .concat(splitRec(lines[0], times - 1))
    .concat(splitRec(lines[1], times - 1));
}

var line = createLine(0, -10, 5, 0, false);
var lines = splitRec(line, 10);

lines.map((l) => scene.add(l));

var render = function () {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

render();

///
