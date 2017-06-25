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