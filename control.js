var images = new Array();
var myRotator = new imageRotator();
var imageCount = 72;
var imagesloaded = 0;
var number = 0;
var dragObject = {};
var toggle = 0;
var counter = 0;
var canvas = document.getElementById('canvas');


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


document.addEventListener('mousedown', function(e) {
	toggle = 1;
	dragObject.downX = e.clientX;
});


document.addEventListener('mouseup', function() {
	toggle = 0;
});


document.addEventListener('mousemove', function(e) {

	if (toggle == 1) {
		if (e.clientX < dragObject.downX) {
			drawNextFrame();
		} else if (e.clientX > dragObject.downX) {
			drawPrevFrame();
		};
	};
	dragObject.downX = e.clientX;
});


function drawNextFrame() {
	number++;
	if (number > imageCount - 1) number = 0;
	myRotator.drawFrame(number);
};


function drawPrevFrame() {
	number--;
	if (number < 0) number = imageCount - 1;
	myRotator.drawFrame(number);
};


canvas.ondragstart = function() {
	return false;
};







var ball = document.getElementById('ball');

document.onmousedown = function(e) {
	var x = e.pageX;
	var y = e.pageY;
	var tx = ball.offsetLeft;
	var ty = ball.offsetTop;

	ball.style.position = 'absolute';
	document.body.appendChild(ball);
	ball.style.zIndex = 1000; 

	function moveAt(e) {
		ball.style.left = tx + e.pageX - x + 'px';
		ball.style.top = ty + e.pageY - y + 'px';
	};

	document.onmousemove = function(e) {
		moveAt(e);
	};

	document.onmouseup = function() {
		document.onmousemove = null;
	};
}