import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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

var controls = new OrbitControls(camera, renderer.domElement);

// smooth my curve over this many points
var numPoints = 20;
var curvepointDistance = 0.5;
var splits = 3;
var rotationY = 45;
var rotationX = 45;
var lengthDivision = 1.3;
var random = 100;

function createLine(x, y, length, zrad, mirror) {
  var curvePoint = mirror ? length / 8 : -length / 8;

  var points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(curvePoint, length * curvepointDistance, 0),
    new THREE.Vector3(0, length, 0),
  ];

  var spline = new THREE.SplineCurve(points);

  var material = new THREE.LineBasicMaterial({
    color: 0xff00f0,
  });

  var geometry = new THREE.BufferGeometry();
  var splinePoints = spline.getPoints(numPoints);

  var line = new THREE.Line(geometry.setFromPoints(splinePoints), material);

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

  var sidea = Math.sin(line.rotation.z) * line.length;
  var sideb = Math.cos(line.rotation.z) * line.length;

  var endX = line.position.x - sidea;
  var endY = line.position.y + sideb;

  lines.push(
    createLine(
      endX,
      endY,
      line.length / lengthDivision + (0.5 - Math.random()) / random,
      line.rotation.z - rotationY * (Math.PI / 180),
    ),
  );
  lines.push(
    createLine(
      endX,
      endY,
      line.length / lengthDivision + (0.5 - Math.random()) / random,
      line.rotation.z + rotationX * (Math.PI / 180),
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

var scene = new THREE.Scene();
rerender();

var render = function () {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

render();

function rerender() {
  scene.clear();
  var line = createLine(0, -10, 5, 0, false);
  var lines = splitRec(line, splits);
  lines.map((l) => scene.add(l));
}

document.querySelector("#splits").addEventListener("input", (e) => {
  splits = e.target.value;
  rerender();
});

document.querySelector("#lengthDivision").addEventListener("input", (e) => {
  lengthDivision = e.target.value / 100;
  rerender();
});

document.querySelector("#curvepointDistance").addEventListener("input", (e) => {
  curvepointDistance = e.target.value / 100;
  rerender();
});

document.querySelector("#rotationX").addEventListener("input", (e) => {
  rotationX = e.target.value;
  rerender();
});

document.querySelector("#rotationY").addEventListener("input", (e) => {
  rotationY = e.target.value;
  rerender();
});

document.querySelector("#random").addEventListener("input", (e) => {
  random = e.target.value;
  rerender();
});

///
