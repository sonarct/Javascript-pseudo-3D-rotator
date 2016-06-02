function imageRotator(images) {
	this.images = images;
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);


	canvas.width = 600;
	canvas.height = 600;
	this.ctx = canvas.getContext("2d");
	

	this.img = new Image();
	this.drawFrame(0);
	this.setFrames(images);
	
};


function drawCanvas(width,height) {
	var canvas = document.createElement('canvas');
};



imageRotator.prototype = {

	drawFrame: function(index) {
		this.index = index;
		this.img.src = this.setFrames[index];
		var ctx = this.ctx;
		this.img.onload = function() {
			ctx.drawImage(this,0,0);
		}	
	},

	setFrames: function(images) {
		this.images = images;
		var frameSet = [];
		for (var i = 0; i < images.length; i++) {
			frameSet.push(new Image().src=images[i]);
		};
		console.log(frameSet);
	}
	
};
