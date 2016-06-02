//Главная функция-конструктор. Принимает массив картинок.
function imageRotator() {
	//Создаем канвас и добавляем его на странциу.
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	canvas.width = 600;
	canvas.height = 600;

	//Задаем переменную для работы с канвасом в 2д.
	this.ctx = canvas.getContext("2d");

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
		console.log(frame);
		this.ctx.drawImage(frame,0,0);

	},

};