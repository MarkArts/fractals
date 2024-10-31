import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

var options = {
  // parameters of the mandelbox
  fixedradius: 1, // no idea
  minradius: 0.5, // lowwering this makes the core more detailed
  scale: -1.25, // zooms in or out (doesn't scale  the quality settings like depth/escape/detail)
  escape: 0.2, // how deep should we search the complex
  depth: 5, // how many itteratins should we run before givving up
  detail: 200, // this to the power of three are the amount of cubes calculated

  // StartCamera position
  cameraX: 2,
  cameraY: 2,
  cameraZ: 2,

  // The box witch the mandel will be renderred in
  boxX: 0,
  boxY: 0,
  boxZ: 0,
  boxSize: 10,
};

console.log(options);

setOptionsFromHash(options);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.x = options.cameraX;
camera.position.y = options.cameraY;
camera.position.z = options.cameraZ;

var renderer = new THREE.WebGLRenderer();
var controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// mandelbox constants
var FIXEDRADIUS = options.fixedradius;
var MINRADIUS = options.minradius;
var RADIUSRATIO = Math.sqrt(FIXEDRADIUS) / Math.sqrt(MINRADIUS);

//Mandelbox paraneters
var SCALE = options.scale;
var ESCAPE = options.escape; // how deep should we search the complex
var DEPTH = options.depth; // how many itteratins should we run before givving up

// Box to render the mandelbox in
var size = options.boxSize;
var BOX = [options.boxX, options.boxY, options.boxZ, size]; // [x, y, z, size]
var DETAIL = options.detail;
var STEP = size / DETAIL; // how big should one point be
var BLOCKSIZE = STEP; //STEP*0.1 == trippy

window.setTimeout(function () {
  document.getElementById("caclulating").style.display = "none";
  document.getElementById("rendering").style.display = "block";

  var blocks = time(
    function () {
      return calculateBlocks(THREE, BOX, STEP, BLOCKSIZE, ESCAPE, DEPTH, {
        MINRADIUS,
        RADIUSRATIO,
        FIXEDRADIUS,
        SCALE,
      });
    },
    "calculateBlocks",
    1,
  );
  window.setTimeout(function () {
    document.getElementById("rendering").style.display = "none";

    var mesh = time(function () {
      return createMesh(THREE, blocks, { BLOCKSIZE });
    }, "createMesh");

    scene.add(mesh);
    render();
  }, 0);
}, 0);

var render = function () {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

render();

function rerender() {
  console.log(SCALE);
  console.log(DEPTH);
  scene.clear();

  scene.add(
    time(function () {
      return createMesh(
        THREE,
        time(
          function () {
            return calculateBlocks(THREE, BOX, STEP, BLOCKSIZE, ESCAPE, DEPTH, {
              MINRADIUS,
              RADIUSRATIO,
              FIXEDRADIUS,
              SCALE,
            });
          },
          "calculateBlocks",
          1,
        ),
        { BLOCKSIZE },
      );
    }, "createMesh"),
  );
  render();

  updateUrl();
}

document.querySelector("#SCALE").setAttribute("value", SCALE * 100);
document.querySelector("#SCALE").addEventListener("input", (e) => {
  SCALE = e.target.value / 100;
  rerender();
});

document.querySelector("#DEPTH").setAttribute("value", DEPTH);
document.querySelector("#DEPTH").addEventListener("input", (e) => {
  DEPTH = e.target.value;
  rerender();
});

document.querySelector("#boxSize").setAttribute("value", size);
document.querySelector("#boxSize").addEventListener("input", (e) => {
  size = e.target.value;

  BOX = [options.boxX, options.boxY, options.boxZ, size]; // [x, y, z, size]
  STEP = size / DETAIL; // how big should one point be
  BLOCKSIZE = STEP; //STEP*0.1 == trippy
  rerender();
});

document.querySelector("#DETAIL").setAttribute("value", DETAIL);
document.querySelector("#DETAIL").addEventListener("input", (e) => {
  DETAIL = e.target.value;

  BOX = [options.boxX, options.boxY, options.boxZ, size]; // [x, y, z, size]
  STEP = size / DETAIL; // how big should one point be
  BLOCKSIZE = STEP; //STEP*0.1 == trippy
  rerender();
});

document.querySelector("#MINRADIUS").setAttribute("value", MINRADIUS * 100);
document.querySelector("#MINRADIUS").addEventListener("input", (e) => {
  MINRADIUS = e.target.value / 100;
  RADIUSRATIO = Math.sqrt(FIXEDRADIUS) / Math.sqrt(MINRADIUS);
  rerender();
});

function updateUrl() {
  options.scale = SCALE;
  options.depth = DEPTH;
  options.boxSize = size;
  options.detail = DETAIL;
  options.minradius = MINRADIUS;

  options.cameraX = camera.position.x;
  options.cameraY = camera.position.y;
  options.cameraZ = camera.position.z;

  window.location.hash = "#" + url();
}

function url() {
  return Object.keys(options).reduce((acc, k) => {
    return k + "=" + options[k] + ";" + acc;
  }, "");
}
