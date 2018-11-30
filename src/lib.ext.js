Promise.prototype.tap = function(cb){
	return this.then(function(value){
		cb(value);
		return value;
	})
}

Promise.prototype.finally = function(cb){
	this.then(cb).catch(cb);
}
