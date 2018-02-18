import EventEmitter from './EventEmitter';

function Drag(element) {
	this.element = element
	this.events  = new EventEmitter

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

export default Drag;
