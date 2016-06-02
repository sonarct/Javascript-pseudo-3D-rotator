function imageRotator() {
	this.canvas = document.createElement('canvas');
	document.body.appendChild(this.canvas);
	

	var clientWidth = document.getElementsByTagName('HTML')[0].clientWidth;
	var clientHeight = document.getElementsByTagName('HTML')[0].clientHeight;

	
	this.width = Math.round(Math.min(clientHeight,clientWidth) * 0.9);
	console.log(this.width);
	this.height = this.width;
	console.log(this.height);

	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.ctx = this.canvas.getContext('2d');
	this.canvas.id = 'canvas';
};


imageRotator.prototype = {
	setFrames: function(images) {
		this.images = images;
	},
	
	drawFrame: function(index) {
		this.index = index;
		var frame = this.images[index];
		this.ctx.drawImage(frame,0,0,this.width,this.height);
	},

	resizeFrame: function(width, height) {
		this.width = width;
		this.height = height;
		this.canvas.width = width;
		this.canvas.height = height;
		this.drawFrame(this.index);
	}
};