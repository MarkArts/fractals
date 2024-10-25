scene.background = new THREE.Color(0x092847);
var light = new THREE.AmbientLight(0x092847); // soft white light
scene.add(light);

var spotLight = new THREE.SpotLight(0xc95b74, 3, 10, 1);
spotLight.position.set(0, 4, 0);
spotLight.castShadow = true;
scene.add(spotLight);

var spotLight = new THREE.SpotLight(0xeaaf69, 3, 10, 1);
spotLight.position.set(0, -4, 0);
spotLight.castShadow = true;
scene.add(spotLight);

var spotLight = new THREE.SpotLight(0xc38d69, 3, 10, 1, 0);
spotLight.position.set(-4, 0, 0);
spotLight.castShadow = true;
scene.add(spotLight);

var spotLight = new THREE.SpotLight(0x1b2f4a, 3, 10, 1);
spotLight.position.set(-4, 0, 0);
spotLight.castShadow = true;
scene.add(spotLight);

var spotLight = new THREE.SpotLight(0x2a6972, 3, 10, 1);
spotLight.position.set(0, 0, -4);
spotLight.castShadow = true;
scene.add(spotLight);

var spotLight = new THREE.SpotLight(0x5d9d83, 3, 10, 1);
spotLight.position.set(0, 0, 4);
spotLight.castShadow = true;
scene.add(spotLight);

renderer.physicallyCorrectLights = true;
