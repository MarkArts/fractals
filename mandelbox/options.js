function setOptionsFromHash(options){
	var hash = window.location.hash.substring(1);
	hash.split(';').forEach(x => {
		key=x.split('=')[0];
		val=x.split('=')[1];
		if(key in options){
			options[key] = val;
		}
	})
}