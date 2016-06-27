function Divificator(amount) {
	this.div = []
	this.angleOffset = []

	for (var j = 0; j < amount; j++) {
		this.div[j] = document.createElement('div')
		this.div[j].style.backgroundColor = rainbow(amount, j)
		this.div[j].className = 'round'
		//this.angleOffset[j] = j / amount;
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
		var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2)
		return (c)
	}


}