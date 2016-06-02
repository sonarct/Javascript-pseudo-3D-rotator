var images = new Array();
var myRotator = new imageRotator();
var imageCount = 72;
var imagesloaded = 0;
var number = 0;
var dragObject = {};


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
	dragFrame();
};


window.addEventListener("resize", function() {
	getWindowSize();
});


function getWindowSize() {
	var x = window.innerWidth;
	var y = window.innerHeight;
	var size = Math.min(x,y) * 0.8;
	myRotator.resizeFrame(size,size);
};


function dragFrame() {
	var myCanvas = document.getElementById('canvas');
	myCanvas.ondragstart = function() {
		return false;
	};
	myCanvas.onmousedown = function(e) {
		dragObject.downX = e.pageX;
		var counter = 0;		
		document.onmousemove = function(e) {
						
			var moveX = e.pageX - dragObject.downX;

			console.log(number);

			if (counter > moveX) {
				number++;
				if (number > imageCount - 1) {
					number = 0;
				}
				myRotator.drawFrame(number);
			} else if (counter < moveX) {
				number--;
				if (number < 0) {
					number = imageCount - 1;
				}
				myRotator.drawFrame(number);
			};

			counter = moveX;
		};

		document.onmouseup = function() {
			document.onmousemove = null;
			myCanvas.onmouseup = null;
		};
	};
};
