function imageRotator() {
	//Создаем канвас и добавляем его на странциу.
	this.canvas = document.createElement('canvas');
	document.body.appendChild(this.canvas);
	this.canvas.width = 600;
	this.canvas.height = 600;

	//Задаем переменную для работы с канвасом в 2д.
	this.ctx = this.canvas.getContext("2d");

};


imageRotator.prototype = {
	//Подгрузить все картинки в браузер и по onload отдать их в работу.
	setFrames: function(images) {
		this.images = images;
		console.log(images);
	},
	
	//Отрисовать нужный фрэйм по индексу.
	drawFrame: function(index) {
		this.index = index;
		var frame = this.images[index];
		this.ctx.drawImage(frame,0,0);
	},

	resizeFrame: function(width, height) {
		this.width = width;
		this.height = height;
		this.canvas.width = width;
		this.canvas.height = height;
		this.drawFrame(this.index);
	}

};