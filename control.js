var images = new Array(),
	myRotator = new ImageRotator(),
	imagesLength = 72,
	imagesloaded = 0,
	toggle = 0,
	canvas = document.getElementById('canvas');
//Coordinates
var x = 0,
	tx = 0,
	bx = 0;
//Speed
var momentum = 0,
	minMomentum = 0.001;
//Factors
var speed = -0.1,
	factorFriction = 0.92,
	friction = 0,
	factorResize = 0.8;
//Buttons
var buttonRight = document.getElementById('rotateRight'),
	buttonLeft = document.getElementById('rotateLeft'),
	manualTime = 350,
	time = 0,
	manualPath = 350,
	manualToggle = 0;
//For calculating speed in 10 frames and smooth moving
var txArray = new Array(),
	timeArray = new Array(),
	sumTx = 0,
	sumTime = 0,
	framesHistory = 10,
	ttx = 0,
	divFrameNumber = document.getElementById('frameNumber');



getImagesArray();



function allLoaded() {
	myRotator.setFrames(images);
	getWindowSize();
	animate();
};


function animate() {
	getSumTimeTx();
	var l = timeArray.length;
	var dt = timeArray[l-1] - timeArray[l-2];

	if (momentum) {
		if (Math.abs(momentum) > minMomentum) {
			for(var i = 0; i < dt; i++) {
				tx += momentum * Math.pow(friction, i)
			};
			momentum = momentum * Math.pow(friction, dt);
			bx = tx;
		} else {
			momentum = 0;
		}
	};

	var index = speed * tx;
	manualRotate();
	myRotator.drawFrame(index);
	requestAnimationFrame(animate);
};


function easing(k) { return --k * k * k + 1 };


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


function getRightSpeed() {
	friction = 0;
	frictionPerFrame = Math.pow(factorFriction, 60/1000);
	ttx = bx + momentum / (1 - frictionPerFrame);
	ttx = Math.round(ttx * speed) / speed;
	friction = 1 - momentum / (ttx - bx);
	friction = Math.min(0.999, Math.max(0, friction));
};


function getWindowSize() {
	var x = window.innerWidth;
	var y = window.innerHeight;
	var size = Math.min(x,y) * factorResize;
	myRotator.resizeFrame(size,size);
};


function manualRotate() {
		if (toggle == 1) {
			manualToggle = 0;
			return;
		};

			if (Date.now() - time > manualTime) {
				manualToggle = 0;
				bx = tx;
			};
};


function getSumTimeTx() {
	if (timeArray.length > framesHistory) {timeArray.shift()};
	if (txArray.length > framesHistory) {txArray.shift()};
	timeArray.push(Date.now());
	txArray.push(tx);
};


//Events
window.addEventListener('resize', function() {
	getWindowSize();
});


canvas.addEventListener('mousedown', function(e) {
	x = e.clientX;
	bx = tx;
	momentum = 0;
	toggle = 1;
	manualToggle == 0;
});


window.addEventListener('mousemove', function(e) {
	if (toggle) {
		tx = bx + e.clientX - x;
		//momentum = 0;
	};
});


window.addEventListener('mouseup', function(e) {
	toggle = 0;
	sumTime = timeArray[framesHistory - 1] - timeArray[0];
	sumTx = txArray[framesHistory - 1] - txArray[0];
	momentum = sumTx / sumTime;
	bx = tx;
	getRightSpeed();
});


buttonRight.addEventListener('click', function() {
	momentum = manualPath / manualTime;
	getRightSpeed();
	manualToggle = 1;
	time = Date.now();
	bx = Math.round(tx);
});


buttonLeft.addEventListener('click', function() {
	momentum = - manualPath / manualTime;
	getRightSpeed();
	manualToggle = 1;
	time = Date.now();
	bx = Math.round(tx);
});