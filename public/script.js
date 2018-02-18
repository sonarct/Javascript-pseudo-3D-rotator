/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function EventEmitter() {
	this.list  = []
	this.links = []
}

EventEmitter.prototype = {

	when: function(list, scope, data, once) {
		for(var type in list) {
			this.on(type, list[type], scope, data, once)
		}
	},

	once: function(type, func, scope, data) {
		this.on(type, func, scope, data, true)
	},

	on: function(type, func, scope, data, once) {
		if('function' !== typeof func) return

		this.list.push({
			type  : type,
			func  : func,
			scope : scope,
			data  : data == null ? [] : [].concat(data),
			once  : once
		})
	},

	off: function(type, func, scope) {

		for(var i = this.list.length -1; i >= 0; i--) {
			var item = this.list[i]

			if((type  == null || type  === item.type)
			&& (func  == null || func  === item.func)
			&& (scope == null || scope === item.scope)) this.list.splice(i, 1)
		}
	},

	will: function(type, data) {
		var self  = this
		,   bound = data == null ? [] : [].concat(data)

		return function() {
			var args = bound.slice()
			for(var i = 0; i < arguments.length; i++) args.push(arguments[i])
			self.emit(type, args)
		}
	},

	emit: function(type, data) {
		if(this.debug) {
			console.log('emit', type, data)
		}

		if(data == null) data = []

		var list = this.list.slice()

		for(var i = 0; i < list.length; i++) {
			var item = list[i]

			if(item.type === type || item.type === Infinity) {
				item.func.apply(item.scope, item.data.concat(data))

				if(!item.once) continue
				var index = this.list.indexOf(item)
				if(~index)  this.list.splice(index, 1)
			}
		}

		for(var i = 0; i < this.links.length; i++) {
			var link = this.links[i]
			var type = link.prefix ? link.prefix + type : type

			link.emitter.emit(type, link.data.concat(data))
		}
	},

	link: function(emitter, prefix, data) {
		this.links.push({
			emitter : emitter,
			prefix  : prefix,
			data    : data == null ? [] : [].concat(data)
		})
	},

	unlink: function(emitter, prefix) {
		for(var i = this.links.length -1; i >= 0; i--) {
			var link = this.links[i]

			if((emitter == null || emitter === link.emitter)
			&& (prefix  == null || prefix  === link.prefix )) this.links.splice(i, 1)
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (EventEmitter);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_ImageRotator__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_Drag__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_Momentum__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_Divificator__ = __webpack_require__(5);





var	radius			= 0
,	angle			= 0 //radian
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
,	speedX			= -0.1
,	speedDiv		= 2 * Math.PI / imagesLength * speedX
,	factorResize	= 0.8
,	myRotator		= new __WEBPACK_IMPORTED_MODULE_0__lib_ImageRotator__["a" /* default */]
,	myDrag			= new __WEBPACK_IMPORTED_MODULE_1__lib_Drag__["a" /* default */](myRotator.canvas)
,	myMomentum		= new __WEBPACK_IMPORTED_MODULE_2__lib_Momentum__["a" /* default */](speedX)
,	myDiv			= new __WEBPACK_IMPORTED_MODULE_3__lib_Divificator__["a" /* default */](amount)

// var buttonRight = document.getElementById('rotateRight')
// ,	buttonLeft  = document.getElementById('rotateLeft')
var	next
,	prev
,	pos = []
,	mystery = -0.2 / speedX

myDrag.offset.x = mystery * 360 * 1000


getImagesArray()
validatePoints()


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
	var index = speedX   * myDrag.offset.x
		angle = speedDiv * myDrag.offset.x
	myRotator.drawFrame(index)

	// document.title = myDrag.offset.x

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
	var x = radius * Math.cos(angle + angleOffset)
	,	y = diffHeight
	,	z = radius * Math.sin(angle + angleOffset)

	var coordinates = [[x, y, z, 1]]
	,	matrix =[[1.0,	0.0,	0.0,	0.000],
				 [0.0,	1.0,	0.0,	0.0],
				 [0.0,	0.0,	1.0,	-0.0009],
				 [0.0,	0.0,	0.0,	2]]

	var result 		= MultiplyMatrix(coordinates, matrix)
	,	perspective = []

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
	div.style.webkitTransform = 'translate('+ dX +'px,'+ dY +'px) scale('+ scale +')'
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


// buttonRight.addEventListener('click', function() {
// getPrev()
// })


// buttonLeft.addEventListener('click', function() {
// getNext()
// })


function changeDiv(temp) {
	var target = myDrag.offset.x - (myDrag.offset.x % (360 * mystery)) + temp * mystery
	console.log('target ' + target)
	myMomentum.manual(target)
}


function getPrev() {
	var circle = 360
	var l = pos.length
	var curr = (myDrag.offset.x % (circle * mystery)) / mystery
	curr = Math.round(Math.abs(curr))

	for (var i = 0; i < l; i++) {

		if (curr >= pos[i]) {
			prev = pos[i - 1]

			if (i == 0) {
				prev = pos[l - 1] - circle
			}

		} else if (curr < pos[0]) {
			prev = pos[l - 1] - circle
		}
	}
	changeDiv(prev)
}


function getNext() {
	var circle = 360
	var l = pos.length
	var curr = (myDrag.offset.x % (circle * mystery)) / mystery
	curr = Math.round(Math.abs(curr))

	for (var i = l - 1; i >= 0; i--) {

		if (curr <= pos[i]) {
			next = pos[i + 1]

			if (i == 0) {
				next = pos[0]
			}
		// 	if (i == l - 1) {
		// 		next = pos[0] + circle
		// 	console.log('case 2')
		// 	}
		} else if (curr > pos[l - 1]) {
			next = pos[0] + circle
		}
	}
	console.log('curr ' + curr)
	console.log('next ' + next)
	changeDiv(next)
}


function validatePoints() {
	pos = []
	for (var i = 0; i < amount; i++) {
		pos.push(points[i].beta)
		if (pos[i] == pos[i - 1]) {
			pos.splice([i - 1], 1)
		}
	}
}


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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ImageRotator() {
	this.canvas = document.createElement('canvas')
	document.body.appendChild(this.canvas)
	this.ctx = this.canvas.getContext('2d')
	this.canvas.id = 'canvas'
}


ImageRotator.prototype = {
	setFrames: function(images) {
		this.images = images
	},

	drawFrame: function(index) {
		if (!index) { index = 0 }
		
		this.indexNext = Math.ceil(index)
		this.indexPrev = Math.floor(index)
		this.opacity = (Math.abs(index - this.indexPrev))

		var imagesLength = this.images.length

		function calculateIndex(index_) {
			index_ = ((index_ % imagesLength) + imagesLength) % imagesLength
			return index_
		}

		var frameNext = this.images[calculateIndex(this.indexNext)]
		var framePrev = this.images[calculateIndex(this.indexPrev)]

		this.ctx.clearRect(0, 0, this.width, this.height)
		this.ctx.globalAlpha = 1
		this.ctx.drawImage(framePrev, 0, 0, this.width, this.height)
		this.ctx.globalAlpha = this.opacity
		this.ctx.drawImage(frameNext, 0, 0, this.width, this.height)
	},

	resizeFrame: function(width, height) {
		this.width = width
		this.height = height
		this.canvas.width = width
		this.canvas.height = height
		this.drawFrame(this.index)
	}
}

/* harmony default export */ __webpack_exports__["a"] = (ImageRotator);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventEmitter__ = __webpack_require__(0);


function Drag(element) {
	this.element = element
	this.events  = new __WEBPACK_IMPORTED_MODULE_0__EventEmitter__["a" /* default */]

	this.offset  = {}
	this.origin  = {}
	this.begin   = {}
	this.point   = {}
	this.delta   = {}

	this.min = {}
	this.max = {}

	this.touch   = 'ontouchstart' in window
	this.start_t = this.touch ? 'touchstart' : 'mousedown'
	this. move_t = this.touch ? 'touchmove'  : 'mousemove'
	this.  end_t = this.touch ? 'touchend'   : 'mouseup'

	this.reset()
	this.bindStart()
}

Drag.prototype = {
	active: false,
	disabled: false,
	scale: 1,

	reset: function() {
		this.offset.x = this.offset.y = 0
		this.origin.x = this.origin.y = 0
		this.begin .x = this.begin .y = 0
		this.point .x = this.point .y = 0
		this.delta .x = this.delta .y = 0

		this.max.x = this.max.y =  Infinity
		this.min.x = this.min.y = -Infinity
	},

	bindStart: function() {
		if(!this.element) return

		window.removeEventListener(this.move_t, this, true)
		window.removeEventListener(this. end_t, this, true)
		this.element.addEventListener(this.start_t, this)
	},

	bindEnd: function() {
		if(!this.element) return

		window.addEventListener(this.move_t, this, true)
		window.addEventListener(this. end_t, this, true)
		this.element.removeEventListener(this.start_t, this)
	},

	start: function(x, y) {
		this.active  = true
		this.changed = false
		this.moved   = false

		this.begin.x = x
		this.begin.y = y

		this.origin.x = this.offset.x
		this.origin.y = this.offset.y

		this.bindEnd()
		this.events.emit('start', [this.offset, this.ev])
	},

	move: function(x, y) {
		this.changed = true
		this.moved   = true

		this.delta.x = x - this.begin.x
		this.delta.y = y - this.begin.y

		this.offset.x = this.origin.x + this.delta.x * this.scale
		this.offset.y = this.origin.y + this.delta.y * this.scale

		this.offset.x = Math.min(this.max.x, Math.max(this.min.x, this.offset.x))
		this.offset.y = Math.min(this.max.y, Math.max(this.min.y, this.offset.y))

		this.events.emit('drag', [this.offset, this.ev])
	},

	end: function() {
		this.active  = false
		this.changed = true

		this.delta.x = 0
		this.delta.y = 0

		this.bindStart()
		this.events.emit('end', [this.offset, this.ev])
	},

	enable: function() {
		this.disabled = false
	},

	disable: function() {
		this.active && this.end()
		this.disabled = true
	},

	handleEvent: function(e) {
		if(this.disabled) return

		this.ev = e
		this.pt = e.touches ? e.touches[0] || e.changedTouches[0] : e

		this.point.x = this.pt.pageX
		this.point.y = this.pt.pageY

		switch(e.type) {
			case this.start_t:
				if(this.touch || e.which === 1) this.start(this.point.x, this.point.y)
			break
			case this.move_t:
				this.move(this.point.x, this.point.y)
			break
			case this.end_t:
				this.end()
			break
		}

		e.preventDefault()
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Drag);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventEmitter__ = __webpack_require__(0);


function Momentum(speedX) {
	this.events = new __WEBPACK_IMPORTED_MODULE_0__EventEmitter__["a" /* default */]
	this.reset()
	this.points = []
	this.speedX = speedX
}

Momentum.prototype = {

	pointCount: 8,
	acceleration: 0.87,
	threshold: 1e-5,

	reset: function() {
		this.active = false

		this.speed  = { x: 0, y: 0, z: 0 }
		this.point  = { x: 0, y: 0, z: 0 }
		this.target = { x: 0, y: 0, z: 0 }
	},

	time: function() {
		return window.performance && window.performance.now ? window.performance.now()
			:  Date.now ? Date.now()
			:  new Date().getTime()
	},

	push: function(point) {
		this.points.push({
			x: +point.x || 0,
			y: +point.y || 0,
			z: +point.z || 0,
			t: this.time()
		})

		if(this.points.length > this.pointCount) this.points.shift()
	},

	start: function() {
		if(this.points.length <2) return

		var accel = Math.pow(this.acceleration, 60 / 1000)
		,   frict = 1 - accel

		var l = this.points.length -1
		,   a = this.points[0]
		,   b = this.points[l]

		var dt = b.t - a.t


		this.point.x = b.x
		this.point.y = b.y
		this.point.z = b.z

		this.speed.x = (b.x - a.x) / dt
		this.speed.y = (b.y - a.y) / dt
		this.speed.z = (b.z - a.z) / dt

		this.target.x = this.point.x + this.speed.x / frict
		this.target.y = this.point.y + this.speed.y / frict
		this.target.z = this.point.z + this.speed.z / frict

		// TODO: crutch to have integer value at the last point
		var R = -1 / this.speedX

		this.target.x = Math.round(this.target.x / R) * R
		this.target.y = Math.round(this.target.y / R) * R
		this.target.z = Math.round(this.target.z / R) * R


		this.speed.x = (this.target.x - this.point.x) * frict
		this.speed.y = (this.target.y - this.point.y) * frict
		this.speed.z = (this.target.z - this.point.z) * frict

		var speed = Math.sqrt(
			this.speed.x * this.speed.x +
			this.speed.y * this.speed.y +
			this.speed.z * this.speed.z)

		this.duration = Math.log(this.threshold / speed) / Math.log(accel)


		this.timeLast  = b.t
		this.timeStart = b.t
		this.timeEnd   = b.t + this.duration

		this.active = true
	},

	manual: function(target) {
		if(this.points.length <2) return

		var accel = Math.pow(this.acceleration, 60 / 1000)
		,   frict = 1 - accel

		var l = this.points.length -1
		,   a = this.points[0]
		,   b = this.points[l]

		var dt = b.t - a.t

		this.point.x = b.x
		this.point.y = b.y
		this.point.z = b.z

		this.speed.x = (b.x - a.x) / dt
		this.speed.y = (b.y - a.y) / dt
		this.speed.z = (b.z - a.z) / dt

		this.target.x = target
		this.target.y = target
		this.target.z = target

		this.speed.x = (this.target.x - this.point.x) * frict
		this.speed.y = (this.target.y - this.point.y) * frict
		this.speed.z = (this.target.z - this.point.z) * frict

		var speed = Math.sqrt(
			this.speed.x * this.speed.x +
			this.speed.y * this.speed.y +
			this.speed.z * this.speed.z)

		this.duration = Math.log(this.threshold / speed) / Math.log(accel)


		this.timeLast  = b.t
		this.timeStart = b.t
		this.timeEnd   = b.t + this.duration

		this.active = true
	},

	move: function() {
		if(!this.active) return

		var dt = Math.round(this.timeNow - this.timeLast)

		var accel      = Math.pow(this.acceleration, 60 / 1000)
		,   accelDelta = Math.pow(accel, dt)
		,   accelSum   = 0

		for(var i = 0; i < dt; i++) accelSum += Math.pow(accel, i)

		this.point.x += this.speed.x * accelSum
		this.point.y += this.speed.y * accelSum
		this.point.z += this.speed.z * accelSum

		this.speed.x *= accelDelta
		this.speed.y *= accelDelta
		this.speed.z *= accelDelta

		if(this.timeNow > this.timeEnd) this.stop()
	},

	update: function() {
		this.timeNow  = this.time()
		this.move()
		this.timeLast = this.timeNow
	},

	stop: function() {
		if(!this.active) return

		this.events.emit('stop')
		this.reset() 
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Momentum);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Divificator(amount) {
	this.div = []
	this.angleOffset = []

	for (var j = 0; j < amount; j++) {
		this.div[j] = document.createElement('div')
		this.div[j].style.backgroundColor = rainbow(amount, j)
		this.div[j].className = 'round'
		document.body.appendChild(this.div[j])
	}

	function rainbow(numOfSteps, step) {
		var r, g, b
		,	h = step / numOfSteps
		,	i = ~~(h * 6)
		,	f = h * 6 - i
		,	q = 1 - f
		switch(i % 6){
			case 0: r = 1; g = f; b = 0; break;
			case 1: r = q; g = 1; b = 0; break;
			case 2: r = 0; g = 1; b = f; break;
			case 3: r = 0; g = q; b = 1; break;
			case 4: r = f; g = 0; b = 1; break;
			case 5: r = 1; g = 0; b = q; break;
		}
		var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2)
					+ ("00" + (~ ~(g * 255)).toString(16)).slice(-2)
					+ ("00" + (~ ~(b * 255)).toString(16)).slice(-2)
		return (c)
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Divificator);


/***/ })
/******/ ]);