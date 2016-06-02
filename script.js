var imgNumber = 0;
var dragObject = {};


function draw() {
	var ctx = document.getElementById('canvas').getContext('2d');
	var img = new Image();

	img.onload = function() {
		ctx.drawImage(img,0,0);
	};
	img.src = 'img/'+ imgNumber + '.jpg';
};


function prevFrame() {
	imgNumber++;
	if (imgNumber > 71) {
		imgNumber = 0;
	};
	showFrameNumber();
	draw();
};


function nextFrame() {
	imgNumber--;
	if (imgNumber < 0) {
		imgNumber = 71;
	};
	showFrameNumber();
	draw();
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

			if (counter > moveX) {
				prevFrame();
			} else if (counter < moveX) {
				nextFrame();
			};

			counter = moveX;
		};

		document.onmouseup = function() {
			document.onmousemove = null;
			myCanvas.onmouseup = null;
		};
	};
};


function showFrameNumber() {
	document.getElementById('frameNumber').innerHTML = 'Frame #' + imgNumber;
};


document.getElementById('nextFrame').onclick = function() {
	nextFrame();
};

document.getElementById('prevFrame').onclick = function() {
	prevFrame();
};


dragFrame();