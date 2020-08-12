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
	
	loadImage(backgroundPath);
}

function loadImage(filePath) {
	console.log("Loading");
	var preload = new createjs.LoadQueue();
	preload.addEventListener("fileload", redraw);
	preload.loadFile(filePath);
	console.log("Loading ....");
}

function redraw() {
	console.log("Loaded ! Redrawing ...");
	clearing();
	ctx.fillStyle = 'black';
	ctx.font = '48px Verdana';
	
	if (backgroundType) {
		var myImage = new Image(750, 1050);
		myImage.src = './backgrounds/' + backgroundType + '.png';
		console.log(myImage);
	
		ctx.drawImage(myImage,0,0);
	}
	
	console.log("Redrawed !");
}