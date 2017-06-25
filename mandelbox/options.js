function setOptionsFromHash(options){
	var hash = window.location.hash.substring(1);
	hash.split(';').forEach(x => {
		key=x.split('=')[0];
		val=x.split('=')[1];
		if(key in options){		
			options[key] = parseFloat(val);
		}
	})
}

function url(){
	return "#"+Object.keys(options).reduce( (acc, k) => {
   		return k+"="+options[k]+";"+acc;
	}, "");
}

function cameraHash(){
	return "#"+"cameraX="+camera.position.x+";"+"cameraY="+camera.position.y+";"+"cameraZ="+camera.position.z+";";
}