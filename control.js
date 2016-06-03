var images = new Array();
var myRotator = new imageRotator();
var imageCount = 72;
var imagesloaded = 0;
var number = 0;
var toggle = 0;
var canvas = document.getElementById('canvas');
//Coordinates
var x = 0;
var tx = 0;
var bx = 0;


for (var i = 0; i < imageCount; i++) {
	images[i] = new Image();
	images[i].src = 'img/' + i + '.jpg';
	images[i].onload = function() {
		imagesloaded++;
		if (imagesloaded == imageCount) {
			console.log('ok');
			allLoaded();
		};
	};
};


function allLoaded() {
	myRotator.setFrames(images);
	myRotator.drawFrame(number);
	getWindowSize();
};


function getWindowSize() {
	var x = window.innerWidth;
	var y = window.innerHeight;
	var size = Math.min(x,y) * 0.8;
	myRotator.resizeFrame(size,size);
};


window.addEventListener('resize', function() {
	getWindowSize();
});


function frameNumber() {
	var number = Math.trunc(- 0.3 * tx % myRotator.images.length);
	if (number < 0) number = myRotator.images.length - Math.abs(number);
	return number;
}


function moveAt() {
	myRotator.drawFrame(frameNumber());
};


document.addEventListener('mousedown', function(e) {
	x = e.clientX;
	toggle = 1;
});


document.addEventListener('mousemove', function(e) {
	if (toggle) {
		tx = bx + e.clientX - x;
		moveAt();
	};
});


document.addEventListener('mouseup', function(e) {
	toggle = 0;
	bx = tx;
});

