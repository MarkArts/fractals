function createMesh(blocks) {
  var vertices = [];
  var colors = [];
  
  if(blocks == null) {
    return;
  }


  var geometry = new THREE.BufferGeometry();
  var v = new THREE.BufferAttribute( new Float32Array( blocks.length * 6*6*3), 3 );  
  var vi = 0;
  for(var i = 0; i < blocks.length; i++) {
      var block = blocks[i]

      var hasbottom = i+1 != blocks.length ? blocks[i+1].x == block.x+block.size : false;

	    //botom      
      v.setXYZ(vi, block.x+block.size, block.y+block.size-block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size-block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size-block.size, block.z+block.size-block.size); vi++;
    
      v.setXYZ(vi, block.x+block.size, block.y+block.size-block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size-block.size, block.z+block.size-block.size); vi++;
      v.setXYZ(vi, block.x+block.size, block.y+block.size-block.size, block.z+block.size-block.size); vi++;
    
      // top
      v.setXYZ(vi, block.x+block.size, block.y+block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size, block.z+block.size-block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size, block.z+block.size); vi++;
    
      v.setXYZ(vi, block.x+block.size, block.y+block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size, block.y+block.size, block.z+block.size-block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size, block.z+block.size-block.size); vi++;

      // // front
      v.setXYZ(vi, block.x+block.size, block.y+block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size, block.y+block.size-block.size, block.z+block.size); vi++;
    
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size-block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size, block.y+block.size-block.size, block.z+block.size); vi++;
    
      // // back
      v.setXYZ(vi, block.x+block.size, block.y+block.size, block.z+block.size-block.size); vi++;
      v.setXYZ(vi, block.x+block.size, block.y+block.size-block.size, block.z+block.size-block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size-block.size, block.z+block.size-block.size); vi++;
    
      v.setXYZ(vi, block.x+block.size, block.y+block.size, block.z+block.size-block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size-block.size, block.z+block.size-block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size, block.z+block.size-block.size); vi++;
    

      // // left
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size-block.size, block.z+block.size-block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size-block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size, block.z+block.size); vi++;
    
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size-block.size, block.z+block.size-block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size-block.size, block.y+block.size, block.z+block.size-block.size); vi++;
    

      // // right
      v.setXYZ(vi, block.x+block.size, block.y+block.size-block.size, block.z+block.size-block.size); vi++;
      v.setXYZ(vi, block.x+block.size, block.y+block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size, block.y+block.size-block.size, block.z+block.size); vi++;
    
      v.setXYZ(vi, block.x+block.size, block.y+block.size, block.z+block.size); vi++;
      v.setXYZ(vi, block.x+block.size, block.y+block.size-block.size, block.z+block.size-block.size); vi++;
      v.setXYZ(vi, block.x+block.size, block.y+block.size, block.z+block.size-block.size); vi++;
    
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