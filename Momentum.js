function Momentum() {
	this.events = new EventEmitter
	this.reset()
}

Momentum.prototype = {

	pointCount: 8,
	acceleration: 0.87,
	threshold: 1e-5,

	reset: function() {
		this.active = false
		this.points = []

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
		//Костыль в конструктор, отсекаем все дробные значения у конечной точки
		this.speed.x = (Math.round(this.target.x / 20) * 20 - this.point.x) * frict
		this.speed.y = (Math.round(this.target.y / 20) * 20 - this.point.y) * frict
		this.speed.z = (Math.round(this.target.z / 20) * 20 - this.point.z) * frict

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

		var accel = Math.pow(this.acceleration, 60 / 1000)
		,   frict = 1 - accel

		var l = this.points.length -1
		,   a = this.points[0]
		,   b = this.points[l]

		this.point.x = b.x
		this.point.y = b.y
		this.point.z = b.z

		this.target.x = target
		this.target.y = target
		this.target.z = target
		//Костыль в конструктор, отсекаем все дробные значения у конечной точки
		this.speed.x = (Math.round(this.target.x / 20) * 20 - this.point.x) * frict
		this.speed.y = (Math.round(this.target.y / 20) * 20 - this.point.y) * frict
		this.speed.z = (Math.round(this.target.z / 20) * 20 - this.point.z) * frict

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