var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;
camera.position.y = 10;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera, renderer.domElement );

// smooth my curve over this many points
var numPoints = 20;

function createLine(x, y, z, length, zrad, yrad)
{
  var points = [
    new THREE.Vector3(0, 0, 0),
    //new THREE.Vector3(length/8, length*0.75, 0),
    new THREE.Vector3(0, length, 0),
  ];

  var spline = new THREE.SplineCurve3(points);

  var material = new THREE.LineBasicMaterial({
      color: 0xff00f0,
  });

  var geometry = new THREE.Geometry();
  var splinePoints = spline.getPoints(numPoints);

  for(var i = 0; i < splinePoints.length; i++){
      geometry.vertices.push(splinePoints[i]);  
  }

  var line = new THREE.Line(geometry, material);

  line.position.x = x;
  line.position.y = y;
  line.position.z = z;

  line.rotateY(yrad * (Math.PI/180));
  line.rotateZ(zrad * (Math.PI/180));

  // This is porabply not the proper way to store the length of the Line
  line.length = length;

  return line;
}

function splitLine(line){
  var lines = [];

  var vector = new THREE.Vector3(0, line.length, 0);
  vector.applyAxisAngle(new THREE.Vector3(0, 0, 1), line.rotation.z);
  vector.applyAxisAngle(new THREE.Vector3(0, 1, 0), line.rotation.y);
  
  var endPoint = vector.add(line.position);

//  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, line.rotation.z - 45 * (Math.PI/180),  line.rotation.x + 45 * (Math.PI/180)));
 // lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, line.rotation.z + 45 * (Math.PI/180),  line.rotation.x + 45 * (Math.PI/180)));
 // lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, line.rotation.z + 45 * (Math.PI/180),  line.rotation.x + 45 * (Math.PI/180)));


  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 45, 0));
  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 45, 120));
  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 45, 240));


  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 0, 120));
  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 20, 120));
  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 40, 120));
  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 60, 120));
  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 80, 120));
  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 100, 120));


  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 0, 240));
  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 20, 240));
  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 40, 240));
  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 60, 240));
  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 80, 240));
  lines.push(createLine(endPoint.x, endPoint.y, endPoint.z, line.length/1.3, 100, 240));


  return lines;
}

function splitRec(line, times){
  if(times <= 0){
    return [line];
  }

  var lines = splitLine(line);
  var nextLines = lines.map(l => splitRec(l, times-1));

  return [line].concat([].concat.apply([], nextLines));
}


var line = createLine(0, -10, 0,  5, 0, 0);
var lines = splitRec(line, 2);


lines.map( l => scene.add(l));

var render = function () {
  requestAnimationFrame( render );

  renderer.render(scene, camera);
};

render();


///
