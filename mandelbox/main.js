var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera, renderer.domElement );

var SCALE = -1.27;
var ESCAPE = 0.2;
var DEPTH = 5;

var FIXEDRADIUS = 1;
var MINRADIUS	= 0.5;
var RADIUSRATIO = Math.sqrt(FIXEDRADIUS) / Math.sqrt(MINRADIUS);

function iterate(vector){
  
  if(vector.x > 1){ vector.x = 2 - vector.x; } else if(vector.x < -1){ vector.x = -2 - vector.x; }
  if(vector.y > 1){ vector.y = 2 - vector.y; } else if(vector.y < -1){ vector.y = -2 - vector.y; }
  if(vector.z > 1){ vector.z = 2 - vector.z; } else if(vector.z < -1){ vector.z = -2 - vector.z; }
  

  var len = vector.length();
  if(len < MINRADIUS){
  	vector.multiplyScalar(RADIUSRATIO);
  }else if(len < FIXEDRADIUS){
  	vector.addScalar(Math.sqrt(FIXEDRADIUS) / Math.sqrt(len));
  }
  vector.multiplyScalar(SCALE);
}

function test(point){
  var p = point.clone();
  for(var x = DEPTH; x > 0;  x--){
    iterate(point);

    point.x = point.x + p.x;
    point.y = point.y + p.y;
    point.z = point.z + p.z;

    if(ESCAPE > point.length()){
      return true;
    }
  }
  return false;
}

var size = 3;
var BOX = [-size/2, size/2, -size/2, size/2];
var STEP = size*(1/100);
var BLOCKSIZE = STEP*0.3;//STEP*0.1 == trippy


var CALCULATING = false;
function calculateBlocks(){
	CALCULATING = true;
	var drop = 0;
	var blocks = [];
	var point = new THREE.Vector3(0,0,0);
	for(var x = BOX[0]; x <= BOX[1]; x+=STEP){
	  for(var y = BOX[0]; y <= BOX[1]; y+=STEP){
	    for(var z = BOX[0]; z <= BOX[1]; z+=STEP){
	      point.set(x,y,z);
	      if( test(point) ){
	        blocks.push({x: x, y: y, z: z, vx:point.x,vy:point.y,vz:point.z});
	      }
	    }
	  }
	}

	console.log('blocks: '+ blocks.length);
	CALCULATING = false;
	return blocks;
}


scene.add(createMesh(calculateBlocks()) );

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
function createMesh(blocks) {
  var vertices = [];
  var colors = [];
  this.blockSize = 1;
  
  if(blocks == null) {
    return;
  }
  
  for(var i = 0; i < blocks.length; i++) {
      var pos = blocks[i]
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
    
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
    
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE]);
    
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);

      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE]);
    
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE]);
    
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
    
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
    
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE]);
    
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
    
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE]);
    
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
      vertices.push([pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE]);
    
  }

  // Draw chunk
  var geometry = new THREE.BufferGeometry();
  var v = new THREE.BufferAttribute( new Float32Array( vertices.length * 3), 3 );
  for ( var i = 0; i < vertices.length; i++ ) {
    v.setXYZ(i, vertices[i][0], vertices[i][1], vertices[i][2]);
  }
  geometry.addAttribute( 'position', v );
  
  // var c = new THREE.BufferAttribute(new Float32Array(blocks.length*36*3), 3 );
  // for ( var i = 0; i < blocks.length; i++ ) {
  //   //console.log(blocks[i].x,blocks[i].vx,blocks[i].y,blocks[i].vy);
  //   for ( var x = 0; x < 36*3; x++ ) {
  //     c.setXYZW( x, 1, 1, 1, 1);
  //   }
  // }
  //geometry.addAttribute( 'color', c );
  var material = new THREE.MeshNormalMaterial() //{ vertexColors: THREE.VertexColors });
  
  geometry.computeVertexNormals();
  geometry.computeFaceNormals();
  var mesh = new THREE.Mesh( geometry, material);

  mesh.position.x = 0;
  mesh.position.y = 0;
  mesh.position.z = 0;

  return mesh
};


///// controls
var slider = document.getElementById("slider");
slider.value = SCALE;
slider.addEventListener("input", setSliderScale);
slider.addEventListener("onclick", setSliderScale);
SLIDERSCALE = 0;
function setSliderScale(e){
	var target = (e.target) ? e.target : e.srcElement;
	SLIDERSCALE = target.value;
}