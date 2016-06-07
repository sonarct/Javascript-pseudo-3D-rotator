var images = new Array(),
	myRotator = new imageRotator(),
	imagesLength = 72,
	imagesloaded = 0,
	number = 0,
	toggle = 0,
	canvas = document.getElementById('canvas');
//Coordinates
var x = 0,
	tx = 0,
	lastTx = 0,
	bx = 0;
//Time
var time = Date.now(),
	diffTime,
	prevTime,
	momentum = 0;
//Factors
var speed = -0.3,
	factorFriction = 0.96,
	factorMomentum = 3,
	factorResize = 0.8;
//Buttons
var buttonRight = document.getElementById('rotateRight');
var buttonLeft = document.getElementById('rotateLeft');
var right = 0;
var left = 0;
var count = 0;
var framesCount = 30;


//Initialize work of script
getImagesArray();


//Functions
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

	if (Math.abs(momentum) > 0.3) {
		tx = tx - factorMomentum * momentum;
		momentum = momentum * factorFriction;
		bx = tx;
	};
	var index = speed * tx;
	myRotator.drawFrame(index);
	manualRotate();

	requestAnimationFrame(animate);
};


function getImagesArray() {
	for (var i = 0; i < imagesLength; i++) {
		images[i] = new Image();
		images[i].src = 'img/' + i + '.jpg';
		images[i].onload = function() {
			imagesloaded++;
			if (imagesloaded == imagesLength) {
				allLoaded();
			};
		};
	};
};


function getWindowSize() {
	var x = window.innerWidth;
	var y = window.innerHeight;
	var size = Math.min(x,y) * factorResize;
	myRotator.resizeFrame(size,size);
};


function manualRotate() {
	if (right && count < framesCount) {
		tx++;
		count++;
	};

	if (left && count < framesCount) {
		tx--;
		count++;
	};

	if (count >= framesCount) {
		left = 0;
		right = 0;
	};
};


//Events
window.addEventListener('resize', function() {
	getWindowSize();
});


document.addEventListener('mousedown', function(e) {
	lastTx = tx;
	x = e.clientX;
	momentum = 0;
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
	momentum = (lastTx - tx) / diffTime;
});


buttonRight.addEventListener('click', function() {
	count = 0;
	right = 1;
});


buttonLeft.addEventListener('click', function() {
	count = 0;
	left = 1;
});