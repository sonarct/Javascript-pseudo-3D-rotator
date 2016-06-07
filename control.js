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
var speed = 0;
//Factors
var factorRotation = -0.3;
var factorFriction = 0.97;
var factorSpeed = 3;
var factorResize = 0.8;


//Initialize work of script
getImagesArray();


function getImagesArray() {
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
};


function allLoaded() {
	myRotator.setFrames(images);
	myRotator.drawFrame(number);
	getWindowSize();
	animate();
};


function animate() {
	prevTime = time;
	time = Date.now();
	diffTime = time - prevTime;
	if (!toggle) {
		tx = tx - factorSpeed * speed;
		speed = speed * factorFriction;
		bx = tx;
	};
	myRotator.drawFrame(frameNumber());
	requestAnimationFrame(animate);
};


//Generates index of array according to mouse coordinates
function frameNumber() {
	var images = myRotator.images.length
	number = Math.round(factorRotation * tx);
	number = ((number % images) + images) % images;
	return number;
};


function getWindowSize() {
	var x = window.innerWidth;
	var y = window.innerHeight;
	var size = Math.min(x,y) * factorResize;
	myRotator.resizeFrame(size,size);
};


//Events
window.addEventListener('resize', function() {
	getWindowSize();
});


document.addEventListener('mousedown', function(e) {
	lastTx = tx;
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
	speed = (lastTx - tx) / diffTime;
});