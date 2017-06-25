var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera, renderer.domElement );


// mandelbox constants
var FIXEDRADIUS = 1;
var MINRADIUS	= 0.5;
var RADIUSRATIO = Math.sqrt(FIXEDRADIUS) / Math.sqrt(MINRADIUS);

//Mandelbox paraneters
var SCALE = -1.27;
var ESCAPE = 0.2; // how deep should we search the complex
var DEPTH = 5; // how many itteratins should we run before givving up

// Box to render the mandelbox in
var size = 3;
var BOX = [0, 0, 0, 1.5];  // [x, y, z, size]
var STEP = size*(1/160); // how big should one point be
var BLOCKSIZE = STEP;//STEP*0.1 == trippy


var blocks = time(function() { return calculateBlocks(BOX, STEP, BLOCKSIZE, ESCAPE, DEPTH); }, 'calculateBlocks', 1);
var mesh = time(function(){ return createMesh(blocks); }, 'createMesh');

scene.add(mesh);

var render = function () {
  requestAnimationFrame( render );

  renderer.render(scene, camera);
};

render();

function rerender(){
  SCALE-=0.01;
  console.log(SCALE);
  while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
  }

  scene.add(createMesh(calculateBlocks()));
  render();
}

//window.setInterval(rerender, 2000)

// render code


///// controls
// var slider = document.getElementById("slider");
// slider.value = SCALE;
// slider.addEventListener("input", setSliderScale);
// SLIDERSCALE = 0;
// function setSliderScale(e){
// 	var target = (e.target) ? e.target : e.srcElement;
// 	SLIDERSCALE = target.value;
// }