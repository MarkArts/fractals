function createMesh(blocks) {
  var vertices = [];
  var colors = [];
  this.blockSize = 1;
  
  if(blocks == null) {
    return;
  }


  var geometry = new THREE.BufferGeometry();
  var v = new THREE.BufferAttribute( new Float32Array( blocks.length * 6*6*3), 3 );  
  var vi = 0;
  for(var i = 0; i < blocks.length; i++) {
      var pos = blocks[i]

      var hasbottom = i+1 != blocks.length ? blocks[i+1].x == pos.x+BLOCKSIZE : false;

	    //botom      
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
    
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
    
      // top
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
    
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;

      // // front
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
    
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
    
      // // back
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
    
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
    

      // // left
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
    
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE-BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
    

      // // right
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
    
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE-BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
      v.setXYZ(vi, pos.x+BLOCKSIZE, pos.y+BLOCKSIZE, pos.z+BLOCKSIZE-BLOCKSIZE); vi++;
    
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
  var material = new THREE.MeshPhongMaterial() //{ vertexColors: THREE.VertexColors });
  
  geometry.computeVertexNormals();
  geometry.computeFaceNormals();
  var mesh = new THREE.Mesh( geometry, material);
  mesh.receiveShadow = true;
  mesh.castShadow = true;

  mesh.position.x = 0;
  mesh.position.y = 0;
  mesh.position.z = 0;

  return mesh
};