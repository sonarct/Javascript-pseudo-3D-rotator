var	radius			= 0
,	angle			= 0
,	points = [{
			"beta" : 60,
			"y"    : 120
		}, {
			"beta" : 150,
			"y"    : 20
		}, {
			"beta" : 240,
			"y"    : -150
		}, {
			"beta" : 260,
			"y"    : 150
		}, {
			"beta" : 310,
			"y"    : -200
		}, {
			"beta" : 310,
			"y"    : 180
	}]
,	amount			= points.length
,	images			= []
,	imagesLength	= 72
,	speedDiv		= Math.PI / imagesLength / 10
,	speed			= -0.05
,	factorResize	= 0.8
,	myRotator		= new ImageRotator
,	myDrag			= new Drag(myRotator.canvas)
,	myMomentum		= new Momentum
,	myDiv			= new Divificator(amount)

var buttonRight = document.getElementById('rotateRight')
,	buttonLeft  = document.getElementById('rotateLeft')
,	next
,	prev
,	counter
,	pos = []





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
	document.title = myDrag.offset.x

	for (var i = 0; i < amount; i++) {
		myDiv.div[i].textContent = i + ' beta ' + points[i].beta + ' y ' + points[i].y
		var myOffsetY = radius * 1.5 * points[i].y / 400
		var myOffsetBeta = Math.PI * (points[i].beta / 180 + 1/2)
		drawObject(myDiv.div[i], myOffsetBeta, myOffsetY)
	}
	requestAnimationFrame(animate)
}


function getImagesArray() {
	var imagesloaded = 0
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


function setCounter(number) {
	return ((number % amount) + amount) % amount
}


buttonRight.addEventListener('click', function() {
	getNeib()
	console.log(prev, next)
	changeDiv(prev)
});


buttonLeft.addEventListener('click', function() {
	getNeib()
	console.log(prev, next)
	changeDiv(next)

});



function changeDiv(temp) {
	var divNum = temp
	if (myMomentum.active) {
		var d = counter + 2
		if (d >= pos.length) {
			d = d - pos.length
			divNum = pos[d]
		}
	}

	var target = myDrag.offset.x - (myDrag.offset.x % 1440) - divNum

	myMomentum.manual(target)
}


function getNeib() {
	var l = pos.length
	var curr = myDrag.offset.x % 1440
	if (curr > 0) {
		curr = 1440 - curr
	} else {
		curr = Math.abs(curr)
	}
	curr = Math.ceil(curr)

	if (curr >= pos[l - 1] || curr <= pos[0]) {
		next = pos[0]
		prev = pos[l - 1]
	} else {
		for (var j = 0; j < l; j++) {
			if (curr > pos[j]) {
				next = pos[j + 1]
				prev = pos[j]
				counter = j
			}
		}
	}
}


function validatePoints() {
	for (var i = 0; i < amount; i++) {
		pos.push(4 * points[i].beta)
		if (pos[i] == pos[i - 1]) {
			pos.splice([i - 1], 1)
		}
	}
}


validatePoints()