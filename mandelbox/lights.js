scene.background = new THREE.Color( 0x092847 );
var light = new THREE.AmbientLight( 0x092847 ); // soft white light
scene.add( light );

var spotLight = new THREE.SpotLight( 0xC95B74, 3, 10, 1,);
spotLight.position.set( 0, 4, 0 );
spotLight.castShadow = true;
scene.add( spotLight );


var spotLight = new THREE.SpotLight( 0xEAAF69, 3, 10, 1,);
spotLight.position.set( 0, -4, 0 );
spotLight.castShadow = true;
scene.add( spotLight );


var spotLight = new THREE.SpotLight( 0xC38D69, 3, 10, 1,0);
spotLight.position.set( -4, 0, 0 );
spotLight.castShadow = true;
scene.add( spotLight );

var spotLight = new THREE.SpotLight( 0x1B2F4A, 3, 10, 1,);
spotLight.position.set( -4, 0, 0 );
spotLight.castShadow = true;
scene.add( spotLight );

var spotLight = new THREE.SpotLight( 0x2A6972, 3, 10, 1,);
spotLight.position.set( 0, 0, -4 );
spotLight.castShadow = true;
scene.add( spotLight );

var spotLight = new THREE.SpotLight( 0x5D9D83, 3, 10, 1,);
spotLight.position.set( 0, 0, 4 );
spotLight.castShadow = true;
scene.add( spotLight );

renderer.physicallyCorrectLights = true;