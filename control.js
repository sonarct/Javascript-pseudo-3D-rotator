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
var speed = -0.2,
	factorFriction = 0.92,
	friction = 0,
	factorResize = 0.8;
//Buttons
var buttonRight = document.getElementById('rotateRight'),
	buttonLeft = document.getElementById('rotateLeft'),
	manualTime = 1000,
	time = 0,
	manualPath = 90,
	manualToggle = 0;
//For calculating speed in 10 frames and smooth moving
var txArray = new Array(),
	timeArray = new Array(),
	sumTx = 0,
	sumTime = 0,
	framesHistory = 10;


	var ttx = 0;


var divFrameNumber = document.getElementById('frameNumber');


function getRightSpeed() {
	friction = 0;
	frictionPerFrame = Math.pow(factorFriction, 60/1000)
	msForEnd = Math.log(minMomentum/Math.abs(momentum)) / Math.log(frictionPerFrame);
	// msForEnd = Math.floor(msForEnd);
	ttx = bx + /* msForEnd * */momentum / (1 - frictionPerFrame);
	console.log('msfe', msForEnd);

	ttx = Math.round(ttx * speed /10) / speed *10;
	console.log('ttx', ttx * speed);

	friction = 1 - /* msForEnd * */momentum / (ttx - bx);
	console.log(friction);
};

//Initialize work of script
getImagesArray();


//Functions
//2 step
function allLoaded() {
	myRotator.setFrames(images);
	getWindowSize();
	animate();
};
var tempor = 0;
//4 step
function animate() {
	getSumTimeTx();
	manualRotate();

	var l = timeArray.length;
	var dt = timeArray[l-1] - timeArray[l-2];

	if (momentum) {
		if (Math.abs(momentum) > minMomentum) {
			tempor += dt;
			for(var i = 0; i < dt; i++) {
				tx += momentum * Math.pow(friction, i)
			}
			momentum = momentum * Math.pow(friction, dt);
			// tx = tx + dt * momentum;
			bx = tx;
		} else {
			momentum = 0;
			console.log(tempor);
			tempor = 0;
		}
	};

	var index = speed * tx;


	myRotator.drawFrame(index);
	requestAnimationFrame(animate);
};


function easing(k) { return --k * k * k + 1 };

//1 step
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

//3 step
function getWindowSize() {
	var x = window.innerWidth;
	var y = window.innerHeight;
	var size = Math.min(x,y) * factorResize;
	myRotator.resizeFrame(size,size);
};


function manualRotate() {
	if (manualToggle == 1) {
		if (Date.now() - time <= manualTime) {
			var temp = (Date.now() - time) / manualTime;
			tx = bx + direction * manualPath * easing(temp);
		} else {
			manualToggle = 0;
			bx = tx;
		};
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
	if (manualToggle == 1) {
		return;
	};
	x = e.clientX;
	momentum = 0;
	toggle = 1;
});


document.addEventListener('mousemove', function(e) {
	if (toggle) {
		tx = bx + e.clientX - x;
	};
});


document.addEventListener('mouseup', function(e) {
	if (manualToggle == 1) {
		return;
	};
	sumTime = timeArray[framesHistory - 1] - timeArray[0];
	sumTx = txArray[framesHistory - 1] - txArray[0];


	momentum = sumTx / sumTime;
	bx = tx;
	getRightSpeed();
	toggle = 0;
});

//buttons
buttonRight.addEventListener('click', function() {
	manualToggle = 1;
	direction = 1;
	time = Date.now();
	bx = tx;
});


buttonLeft.addEventListener('click', function() {
	manualToggle = 1;
	direction = -1;
	time = Date.now();
	bx = tx;
});