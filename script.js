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
	

	this.setFrames(images);
	//this.drawFrame(0);	
};




imageRotator.prototype = {
	//Подгрузить все картинки в браузер и по onload отдать их в работу.
	setFrames: function(images) {
		this.images = images;
		this.frameSet = new Array();
		//Проверка на onload
		var imageCount = images.length;
		var imagesloaded = 0;
		for (var i = 0; i < imageCount; i++) {
			//Присвоение массиву картинок
			this.frameSet[i] = new Image();
			this.frameSet[i].src = images[i];
			//Сама проверка на подгрузку
			this.frameSet[i].onload = function() {
				imagesloaded++;
				if (imagesloaded == imageCount) {
					allLoaded();
				}
			}
		};

		var drawFrame = this.drawFrame;

		function allLoaded() {
				console.log('zbs');
		}
	},
	
	//Отрисовать нужный фрэйм по индексу.
	drawFrame: function(index) {
		this.index = index;
		var ctx = this.ctx;
		var frame = this.frameSet[index];
		frame.onload = function() {
			ctx.drawImage(this,0,0);
		};

	},

};