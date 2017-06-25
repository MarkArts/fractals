var options = {
  // parameters of the mandelbox
  fixedradius: 1,   // no idea
  minradius: 0.5,  // lowwering this makes the core more detailed
  scale: -1.25,  // zooms in or out (doesn't scale  the quality settings like depth/escape/detail)
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
  itts: 2
};


console.log(options);

setOptionsFromHash(options);


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

camera.position.x = options.cameraX;
camera.position.y = options.cameraY;
camera.position.z = options.cameraZ;

var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls( camera, renderer.domElement );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// mandelbox constants
var FIXEDRADIUS = options.fixedradius;
var MINRADIUS	= options.minradius;
console.log(MINRADIUS);
var RADIUSRATIO = Math.sqrt(FIXEDRADIUS) / Math.sqrt(MINRADIUS);

//Mandelbox paraneters
var SCALE = options.scale;
var ESCAPE = options.escape; // how deep should we search the complex
var DEPTH = options.depth; // how many itteratins should we run before givving up

// Box to render the mandelbox in
var size = options.boxSize
var BOX = [options.boxX, options.boxY, options.boxZ, size];  // [x, y, z, size]

window.setTimeout(function(){
  document.getElementById("caclulating").style.display = 'none';
  document.getElementById("rendering").style.display = 'block';

  var blocks = time(function() { return calculateBlocks(BOX, options.detail, ESCAPE, DEPTH, options.itts); }, 'calculateBlocks');
  window.setTimeout(function(){
    document.getElementById("rendering").style.display = 'none';

    var mesh = time(function(){ return createMesh(blocks); }, 'createMesh');

    scene.add(mesh);
    render();
  },0);
},0);

var render = function () {
  requestAnimationFrame( render );

  renderer.render(scene, camera);
};

render();

function rerender(){
  SCALE-=0.01
  DEPTH+=0.02
  console.log(SCALE);
  console.log(DEPTH);
  while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
  }


  scene.add(time(function() { return createMesh(time(function() { return calculateBlocks(BOX, STEP, BLOCKSIZE, ESCAPE, DEPTH); }, 'calculateBlocks'))}, 'createMesh'));
  render();
}

//window.setInterval(rerender, 400)

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