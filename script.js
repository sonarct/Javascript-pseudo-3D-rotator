//Главная функция-конструктор. Принимает массив картинок.
function imageRotator(images) {
	this.images = images;
	//Создаем канвас и добавляем его на странциу.
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	canvas.width = 600;
	canvas.height = 600;

	//Задаем переменную для работы с канвасом в 2д.
	this.ctx = canvas.getContext("2d");
	

	//this.setFrames(images);
	//this.drawFrame(30);	
};




imageRotator.prototype = {
	//Подгрузить все картинки в браузер и по onload отдать их в работу.
	setFrames: function(images) {
		this.images = images;
	},
	
	//Отрисовать нужный фрэйм по индексу.
	drawFrame: function(index) {
		this.index = index;
		var ctx = this.ctx;
		var frame = this.images[index];
		frame.onload = function() {
			ctx.drawImage(this,0,0);
		};

	},

};