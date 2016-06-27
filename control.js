var	radius			= 0
,	angle			= 0
,	points = [{
		 "beta" : 240,
		 "y"    : -150
		}, {
		 "beta" : 150,
		 "y"    : 20
		}, {
		 "beta" : 310,
		 "y"    : -200
		}, {
		 "beta" : 260,
		 "y"    : 150
		}, {
		 "beta" : 60,
		 "y"    : 120
		}, {
		 "beta" : 310,
		 "y"    : 180
	}]
,	amount			= points.length
,	images			= []
,	imagesLength	= 72
,	speedDiv		= Math.PI / imagesLength / 10
,	speed			= -0.05
,	imagesloaded	= 0
,	factorResize	= 0.8
,	myRotator		= new ImageRotator
,	myDrag			= new Drag(document)
,	myMomentum		= new Momentum
,	myDiv		= new Divificator(amount)
,	myDivOffset	= 0





var buttonRight	= document.getElementById('rotateRight')
,	buttonLeft	= document.getElementById('rotateLeft')


getImagesArray()


function allLoaded() {
	myRotator.setFrames(images)
	adaptSize()
	animate()
}


function animate() {
	myMomentum.push(myDrag.offset)
	myMomentum.update()
	if (myMomentum.active) {
		myDrag.offset.x = myMomentum.point.x
	}
	var index = speed * myDrag.offset.x
	angle =  speedDiv * myDrag.offset.x
	myRotator.drawFrame(index)

	for (var i = 0; i < amount; i++) {
		function setAngleOffset(myAngle) {
			return myAngle + Math.PI / 2
		}
		myDiv.div[i].textContent = i + ' beta ' + points[i].beta + ' y ' + points[i].y
		var myOffsetY = radius * 1.5 * points[i].y / 400
		var myOffsetBeta = points[i].beta * Math.PI / 180
		drawObject(myDiv.div[i], setAngleOffset(myOffsetBeta), myOffsetY)
	}
	requestAnimationFrame(animate)
}


function getImagesArray() {
	for (var i = 0; i < imagesLength; i++) {
		images[i] = new Image()
		images[i].src = 'img/' + i + '.jpg'
		images[i].onload = function() {
			imagesloaded++
			if (imagesloaded == imagesLength) {
				allLoaded()
			}
		}
	}
}


function adaptSize() {
	var x = window.innerWidth
	var y = window.innerHeight
	var size = Math.min(x,y) * factorResize
	myRotator.resizeFrame(size,size)

	radius = size / 1.5
	var height = 0.2 * size
	,	width = 0.25 * size
	,	margin = (-height) / 2 + 'px 0px 0px ' + (-width) / 2 + 'px'
	myDivOffset = size * 0

	for (var i = 0; i < amount; i++) {
		myDiv.div[i].style.height = height + 'px'
		myDiv.div[i].style.width = width + 'px'
		myDiv.div[i].style.margin = margin
	}
}


function drawObject(div, angleOffset, diffHeight) {
	var x = -radius * Math.cos(angle + angleOffset)
	,	y = diffHeight
	,	z = radius * Math.sin(angle + angleOffset)

	var coordinates = [[x, y, z, 1]]
	,	matrix =[[1.0,	0.0,	0.0,	0.000],
				 [0.0,	1.0,	0.0,	0.0],
				 [0.0,	0.0,	1.0,	-0.0009],
				 [0.0,	0.0,	0.0,	2]]

	function MultiplyMatrix(A, B) {
		var rowsA = A.length, colsA = A[0].length
		,	rowsB = B.length, colsB = B[0].length
		,	C = []
		if (colsA != rowsB) return false
		for (var i = 0; i < rowsA; i++) C[i] = []
		for (var k = 0; k < colsB; k++) {
			for (var i = 0; i < rowsA; i++) {
				var t = 0
				for (var j = 0; j < rowsB; j++) {
					t += A[i][j] * B[j][k]
				}
				C[i][k] = t
			}
		}
		return C
	}

	var result = MultiplyMatrix(coordinates, matrix)

	var perspective = []
	for (var g = 0; g < 4; g++) {
		perspective[g] = result[0][g] / result[0][3]
	}

	var rad = (angle + angleOffset + Math.PI / 2) / 2
	,	scale = z / radius / 3 + 0.5
	,	opacity = z / radius / 1.5 + 0.4
	,	dX = perspective[0] + window.innerWidth  / 2
	,	dY = perspective[1] + window.innerHeight / 2
	div.style.zIndex = Math.round(z) + 500
	div.style.transform = 'translate('+ dX +'px,'+ dY +'px) scale('+ scale +')'
	div.style.opacity = opacity
}


window.addEventListener('resize', function() {
	adaptSize()
})


myDrag.events.on('end', function() {
	myMomentum.push(myDrag.offset)
	myMomentum.start()
})


myDrag.events.on('drag', function() {
	myMomentum.stop()
})