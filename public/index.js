var canvas;
var ctx;
var objClass;
var backgroundType;
var cardClass;
var cardClassImg = false;
var cardName;
var cardFlavor;
var firstTag;

window.onload =  function () {
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
}

function clearing() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function nameChange() {
	cardName = event.target.value;
	
	redraw();
}

function flavorChange() {
	cardFlavor = event.target.value;
	
	redraw();
}

function classChange() {
	cardClass = event.target.innerText.toUpperCase();
	
	cardClassImg = (cardClass == "ANOMALY/CHARACTER");
	
	redraw();
}

function firstTagChange() {
	firstTag = event.target.innerText.toUpperCase();
	// firstTagPath = './icons/' + firstTag + '.png';
	
	redraw();
}

function backgrounding () {
	backgroundType = event.target.innerText.toUpperCase();
	// backgroundPath = './backgrounds/' + backgroundType + '.png';
	
	redraw();
}

function redraw() {
	clearing();
	
	if (backgroundType) {
		var bg_ToDraw = new Image(750, 1050);
		bg_ToDraw.src = './backgrounds/' + backgroundType + '.png';
		console.log(bg_ToDraw);
	
		bg_ToDraw.addEventListener("load", function () {
			console.log("Loaded !");
			ctx.drawImage(bg_ToDraw,0,0);
			drawText();
		});
	}
	if (cardClassImg) {
		var class_ToDraw = new Image(436, 109);
		class_ToDraw.src = './misc/AnomalyCharacterContainer.png';
		console.log(class_ToDraw);
		
		class_ToDraw.addEventListener("load", function () {
			console.log("Loaded !");
			ctx.drawImage(class_ToDraw, 20, 103);
			drawText();
		});
	}
	if (firstTag) {
		var firstTag_ToDraw = new Image(70, 70);
		firstTag_ToDraw.src = './icons/' + firstTag + '.png';
		console.log(firstTag_ToDraw);
		
		firstTag_ToDraw.addEventListener("load", function() {
			console.log("Tag Loaded!");
			ctx.drawImage(firstTag_ToDraw, 640, 175);
			drawText();
		});
	}
	
	drawText();
}

function drawText() {
	if (cardFlavor) {
		ctx.fillStyle = 'black';
		ctx.font = "48px ITC Bauhaus";
		ctx.textAlign = "center";
		ctx.fillText(cardFlavor, 750/2, 70);
	}
	if (!cardClassImg && cardClass) {
		ctx.fillStyle = 'black';
		ctx.font = "40px ITC Bauhaus";
		ctx.textAlign = "center";
		ctx.fillText(cardClass, 150, 185);
	}
	if (cardName) {
		ctx.fillStyle = 'black';
		ctx.font = "40px ITC Bauhaus";
		ctx.textAlign = "center";
		ctx.fillText(cardName, 525, 645);
	}
}