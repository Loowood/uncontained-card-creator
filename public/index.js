// Canvas variable
var canvas;
// Canvas context variable, used for drawing things on canvas
var ctx;

var backgroundType; // Type of Background
var cardClass; // The class of the card (Civilian, Anomaly, etc)
var cardClassImg = false; // If the class if ANOMALY/CHARACTER, then this becomes true
var cardName; // The Name of the Card, for instance "SCP-343"
var cardFlavor; // The Title of the Card, for instance "God"
var firstTag; // The name of the image file for the first tag

window.onload =  function () { // Waiting for the page to load before getting the canvas context
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
}

function clearing() { // This is used to clear the whole canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// This is the handler for when the user changes the card name
function nameChange() {
	cardName = event.target.value;
	
	redraw();
}

// This is the handler for when the user changes the card title
function flavorChange() {
	cardFlavor = event.target.value;
	
	redraw();
}

// This is the handler for when the user changes the card class
function classChange() {
	cardClass = event.target.innerText.toUpperCase();
	
	cardClassImg = (cardClass == "ANOMALY/CHARACTER");
	
	redraw();
}

// This is the handler for when the user changes the card first tag
function firstTagChange() {
	firstTag = event.target.innerText.toUpperCase();
	// firstTagPath = './icons/' + firstTag + '.png';
	
	redraw();
}

// This is the handler for when the user changes the type of background
function backgrounding () {
	backgroundType = event.target.innerText.toUpperCase();
	// backgroundPath = './backgrounds/' + backgroundType + '.png';
	
	redraw();
}

// This function is mainly for drawing images on the canvas
function redraw() {
	clearing();
	
	if (backgroundType) { // If the background has been selected, then we draw it
		var bg_ToDraw = new Image(750, 1050);
		bg_ToDraw.src = './backgrounds/' + backgroundType + '.png';
		console.log(bg_ToDraw);
		
		// This part is crucial. It waits for the image to load, and then draws it as a callback
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


// This function mainly draws the text parts on the canvas, it happens usually after the images, otherwise the images overlays the text
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