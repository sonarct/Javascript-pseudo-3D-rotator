function imageRotator() {
	this.canvas = document.createElement('canvas');
	document.body.appendChild(this.canvas);
	this.ctx = this.canvas.getContext('2d');
	this.canvas.id = 'canvas';
};

var z = 0;

imageRotator.prototype = {
	setFrames: function(images) {
		this.images = images;
	},
	
	drawFrame: function(index) {
		if (!index) {index = 0};
		this.indexNext = Math.ceil(index);
		this.indexPrev = Math.floor(index);
		
		this.opacity = Math.abs(index - this.indexPrev);

		var imagesLength = this.images.length;

		this.indexNext = ((this.indexNext % imagesLength) + imagesLength) % imagesLength;
		this.indexPrev = ((this.indexPrev % imagesLength) + imagesLength) % imagesLength;

		var frameNext = this.images[this.indexNext];
		var framePrev = this.images[this.indexPrev];

		this.ctx.clearRect(0, 0, this.width, this.height);
		
		this.ctx.globalAlpha = 1;
		this.ctx.drawImage(framePrev, 0, 0, this.width, this.height);
		
		this.ctx.globalAlpha = this.opacity;
		this.ctx.drawImage(frameNext, 0, 0, this.width, this.height);

	},

	resizeFrame: function(width, height) {
		this.width = width;
		this.height = height;
		this.canvas.width = width;
		this.canvas.height = height;
		this.drawFrame(this.index);
	}
};