var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var material = new THREE.LineBasicMaterial({
  color: 0x0000ff
});

var geometry = new THREE.Geometry();
geometry.vertices.push(
  new THREE.Vector3( 0, 0, 0 ),
  new THREE.Vector3( 0, 1, 0 ),
  new THREE.Vector3( 1, 0, 0 )
);

var line = new THREE.Line( geometry, material );
scene.add( line );

camera.position.z = 5;

var render = function () {
  requestAnimationFrame( render );

  line.rotation.x += 0.01;
  line.rotation.y += 0.01;

  renderer.render(scene, camera);
};

render();


///



var createCurvePath = function(start, end, elevation) {
    var start3 = globe.translateCordsToPoint(start.latitude,start.longitude);
    var end3 = globe.translateCordsToPoint(end.latitude, end.longitude);
    var mid = (new LatLon(start.latitude,start.longitude)).midpointTo(new LatLon(end.latitude, end.longitude));
   var middle3 = globe.translateCordsToPoint(mid.lat(), mid.lon(), elevation);

    var curveQuad = new THREE.QuadraticBezierCurve3(start3, middle3, end3);
//   var curveCubic = new THREE.CubicBezierCurve3(start3, start3_control, end3_control, end3);

    var cp = new THREE.CurvePath();
    cp.add(curveQuad);
//   cp.add(curveCubic);
    return cp;
}