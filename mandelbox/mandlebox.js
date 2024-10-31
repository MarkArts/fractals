function iterate(vector, options) {
  if (vector.x > 1) {
    vector.x = 2 - vector.x;
  } else if (vector.x < -1) {
    vector.x = -2 - vector.x;
  }
  if (vector.y > 1) {
    vector.y = 2 - vector.y;
  } else if (vector.y < -1) {
    vector.y = -2 - vector.y;
  }
  if (vector.z > 1) {
    vector.z = 2 - vector.z;
  } else if (vector.z < -1) {
    vector.z = -2 - vector.z;
  }

  var len = vector.length();
  if (len < options.MINRADIUS) {
    vector.multiplyScalar(options.RADIUSRATIO);
  } else if (len < options.FIXEDRADIUS) {
    vector.addScalar(Math.sqrt(options.FIXEDRADIUS) / Math.sqrt(len));
  }
  vector.multiplyScalar(options.SCALE);
}

function test(point, escape, depth, options) {
  var px = point.x;
  var py = point.y;
  var pz = point.z;
  for (var x = depth; x > 0; x--) {
    iterate(point, options);

    point.x = point.x + px;
    point.y = point.y + py;
    point.z = point.z + pz;

    if (escape > point.length()) {
      return true;
    }
  }
  return false;
}

// box = [x, y, z, size]
function calculateBlocks(THREE, box, step, blocksize, escape, depth, options) {
  size = box[3];
  startx = box[0] - size / 2;
  starty = box[1] - size / 2;
  startz = box[2] - size / 2;
  endx = box[0] + size / 2;
  endy = box[1] + size / 2;
  endz = box[2] + size / 2;

  var drop = 0;
  var blocks = [];
  var point = new THREE.Vector3(0, 0, 0);
  for (var x = startx; x <= endx; x += step) {
    for (var y = starty; y <= endy; y += step) {
      for (var z = startz; z <= endz; z += step) {
        point.set(x, y, z);
        if (test(point, escape, depth, options)) {
          blocks.push({
            x: x,
            y: y,
            z: z,
            vx: point.x,
            vy: point.y,
            vz: point.z,
          });
        }
      }
    }
  }

  return blocks;
}
