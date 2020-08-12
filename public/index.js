var canvas;
var ctx;
var objClass;
var backgroundType;

window.onload =  function () {
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
}

function clearing() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function backgrounding () {
	backgroundType = event.target.innerText.toUpperCase();
	backgroundPath = './backgrounds/' + backgroundType + '.png';
	
	redraw();
}

function redraw() {
	console.log("Loaded ! Redrawing ...");
	clearing();
	ctx.fillStyle = 'black';
	ctx.font = '48px Verdana';
	
	if (backgroundType) {
		var bg_ToDraw = new Image(750, 1050);
		bg_ToDraw.src = './backgrounds/' + backgroundType + '.png';
		console.log(bg_ToDraw);
	
		bg_ToDraw.addEventListener("load", function () {
			ctx.drawImage(bg_ToDraw,0,0);
		});
	}
	
	console.log("Redrawed !");
}