
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

function test(point, escape, depth){
  var px = point.x;
  var py = point.y;
  var pz = point.z;
  for(var x = depth; x > 0;  x--){
    iterate(point);

    point.x = point.x + px;
    point.y = point.y + py;
    point.z = point.z + pz;

    if(escape > point.length()){
      return true;
    }
  }
  return false;
}

function calculateBlocks(box, detail, escape, depth, itt){
	if(itt < 0){
		return [];
	}

	var scaler=8.5;
	size = box[3];
	step = size/detail;
	console.log(step, MINRADIUS);	

	startx = box[0] - size/2;
	starty = box[1] - size/2;
	startz = box[2] - size/2;
	endx = box[0] + size/2
	endy = box[1] + size/2
	endz = box[2] + size/2

	smallerBox = [box[0], box[1], box[2], size/scaler];
	console.log(box);

	var drop = 0;
	var blocks = [];
	var point = new THREE.Vector3(0, 0, 0);
	for(var x = startx; x <= endx; x+=step){
	  for(var y = starty; y <= endy; y+=step){
	    for(var z = startz; z <= endz; z+=step){
	      point.set(x,y,z);

     	  if(x > -size/scaler && x < size/scaler &&
     	  	 y > -size/scaler && y < size/scaler &&
     	  	 z > -size/scaler && z < size/scaler) continue;

	      if( test(point, escape, depth) ){
	        blocks.push({x: x, y: y, z: z, vx:point.x,vy:point.y,vz:point.z, size: step});
	      }
	    }
	  }
	}

	MINRADIUS = MINRADIUS/4
	RADIUSRATIO = Math.sqrt(FIXEDRADIUS) / Math.sqrt(MINRADIUS);

	return blocks.concat(calculateBlocks(smallerBox, detail, escape*2.1, depth, itt-1));
}