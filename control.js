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
var lastTx = 0;
var bx = 0;
//Time
var time = Date.now();
var diffTime;
var prevTime;
var speed;


for (var i = 0; i < imageCount; i++) {
	images[i] = new Image();
	images[i].src = 'img/' + i + '.jpg';
	images[i].onload = function() {
		imagesloaded++;
		if (imagesloaded == imageCount) {
			allLoaded();
		};
	};
};


function allLoaded() {
	myRotator.setFrames(images);
	myRotator.drawFrame(number);
	getWindowSize();
	animate();
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
	var images = myRotator.images.length
	number = Math.round(-0.3 * tx);
	number = ((number % images) + images) % images;
	return number;
};


function moveAt() {
	myRotator.drawFrame(frameNumber());
};


document.addEventListener('mousedown', function(e) {
	x = e.clientX;
	toggle = 1;
});


document.addEventListener('mousemove', function(e) {
	if (toggle) {
		lastTx = tx;
		tx = bx + e.clientX - x;
	};
});


document.addEventListener('mouseup', function(e) {
	bx = tx;
	toggle = 0;
	slide();
});


function animate() {
	prevTime = time;
	time = Date.now();
	diffTime = time - prevTime;
	moveAt();
	requestAnimationFrame(animate);
};


function slide() {
	speed = (lastTx - tx) / diffTime;
	console.log(speed);
};


