var images = new Array();
var myRotator = new imageRotator();
var imageCount = 72;
var imagesloaded = 0;


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
	myRotator.drawFrame(44);
	getWindowSize();
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