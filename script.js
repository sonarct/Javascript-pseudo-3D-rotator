function imageRotator() {
	this.canvas = document.createElement('canvas');
	document.body.appendChild(this.canvas);
	this.ctx = this.canvas.getContext('2d');
	this.canvas.id = 'canvas';
};


imageRotator.prototype = {
	setFrames: function(images) {
		this.images = images;
	},
	
	drawFrame: function(index) {
		this.index = index;
		var imagesLength = this.images.length;
		this.index = ((this.index % imagesLength) + imagesLength) % imagesLength;
		var frame = this.images[this.index];
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