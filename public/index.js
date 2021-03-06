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
var conceptName; // The name of the original author of the SCP this card is based on
var firstEffectUnparsed; // The first effect text, unparsed by markdown
var secondEffectUnparsed;
var firstEffectIcon; // The first effect icon
var secondEffectIcon; // The second effect icon
var quote; // The quote of the card

var iconX1 = 40;
var iconY1 = 700;
var iconX2 = 40;
var iconY2 = 820;

var textX1 = 130;
var textY1 = 650;
var textX2 = 130;
var textY2 = 810;

var quoteX = 25;
var quoteY = 910;

window.onload =  function () { // Waiting for the page to load before getting the canvas context
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
	document.getElementById('iconX1').value = iconX1;
	document.getElementById('iconY1').value = iconY1;
	document.getElementById('iconX2').value = iconX2;
	document.getElementById('iconY2').value = iconY2;

	document.getElementById('textX1').value = textX1;
	document.getElementById('textY1').value = textY1;
	document.getElementById('textX2').value = textX2;
	document.getElementById('textY2').value = textY2;

	document.getElementById('quoteX').value = quoteX;
	document.getElementById('quoteY').value = quoteY;

	drawText();
}

function clearing () { // This is used to clear the whole canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// This is the handler for when the user changes the card name
function nameChange  () {
	cardName = event.target.value;

	redraw();
}

// This is the handler for when the user changes the card title
function flavorChange () {
	console.log('flavorChange');
	cardFlavor = event.target.value;

	redraw();
}

// This is the handler for when the user changes the card class
function classChange () {
	cardClass = event.target.innerText.toUpperCase();

	cardClassImg = (cardClass == "ANOMALY/CHARACTER");

	redraw();
}

// This is the handler for when the user changes the card first tag
function firstTagChange () {
	firstTag = event.target.innerText.toUpperCase();
	// firstTagPath = './icons/' + firstTag + '.png';

	redraw();
}

function conceptChange () {
	conceptName = event.target.value;

	redraw();
}

function firstEffectIconChange () {
	firstEffectIcon = event.target.value.toUpperCase();

	redraw();
}

function secondEffectIconChange () {
	secondEffectIcon = event.target.value.toUpperCase();

	redraw();
}

// This is the handler for when the user wants to change the position of the effect icons
function iconPositionChange () {
	switch (event.target.name) {
		case "X1":
			iconX1 = event.target.value;
			break;
		case 'Y1':
			iconY1 = event.target.value;
			break;
		case 'X2':
			iconX2 = event.target.value;
			break;
		case 'Y2':
			iconY2 = event.target.value;
			break;
	}

	redraw();
}

// This is the handler for when the user wants to change the position of the effect texts
function textPositionChange () {
	switch (event.target.name) {
		case "X1":
			textX1 = event.target.value;
			break;
		case 'Y1':
			textY1 = event.target.value;
			break;
		case 'X2':
			textX2 = event.target.value;
			break;
		case 'Y2':
			textY2 = event.target.value;
			break;
	}

	redraw();
}

// This is the handler for when the user wants to change the position of the card quote
function quotePositionChange () {
	switch (event.target.name) {
		case "X":
			quoteX = event.target.value;
			break;
		case 'Y':
			quoteY = event.target.value;
			break;
	}

	redraw();
}

// This is the handler for when the user changes the first effect text
function effectChange () {
	if (event.target.name == "1") {
		firstEffectUnparsed = event.target.value;
		effectParse(firstEffectUnparsed, 1, false);
	} else if (event.target.name == "2") {
		secondEffectUnparsed = event.target.value;
		effectParse(secondEffectUnparsed, 2, false);
	}
}

// This is the handler for whent the user changes the card quote
function quoteChange () {
	quote = event.target.value;

	effectParse(quote, 3, true);
}

// Parsing the effect text
function effectParse (valueUnparsed, nbZone, isQuote) {
	let regexImg = /\[img\:(\w+)\]/;
	let converter = new showdown.Converter();
    let text      = valueUnparsed.replace(' ', '&nbsp;');
	console.log(text);
    let html      = converter.makeHtml(text.replaceAll(' ', '&ensp;'));
	html      = html.replace(regexImg, '<img src="./icons/$1.png"></img>');
	if (isQuote) {
		html      = html.replace("<p>", '<p style="font-size: 22px; font-family: \'Verdana\'; color: gray">');
	} else {
		html      = html.replace("<p>", '<p style="font-size: 30px; font-family: \'Verdana\';">');
	}
	console.log('rendered-zone ' + nbZone);
	document.getElementById('rendered-zone ' + nbZone).innerHTML = html;

	redraw();
}

// This is the handler for when the user changes the type of background
function backgrounding () {
	backgroundType = event.target.innerText.toUpperCase();
	// backgroundPath = './backgrounds/' + backgroundType + '.png';

	redraw();
}

// To render html onto a canvas
function render_html_to_canvas(html, ctx, x, y, width, height) {
  var data = "data:image/svg+xml;charset=utf-8," + '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
    '<foreignObject width="100%" height="100%">' +
    html_to_xml(html) +
    '</foreignObject>' +
    '</svg>';

  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, x, y);
	console.log("Hmtl rendered, img loaded !");
  }
  img.src = data;
}

function html_to_xml(html) {
  var doc = document.implementation.createHTMLDocument('');
  doc.write(html);

  // You must manually set the xmlns if you intend to immediately serialize
  // the HTML document to a string as opposed to appending it to a
  // <foreignObject> in the DOM
  doc.documentElement.setAttribute('xmlns', doc.documentElement.namespaceURI);

  // Get well-formed markup
  html = (new XMLSerializer).serializeToString(doc.body);
  return html;
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
	if(firstEffectIcon) {
		var firstEffectIcon_ToDraw = new Image(70, 70);
		firstEffectIcon_ToDraw.src = './icons/effects/' + firstEffectIcon + '.png';
		console.log(firstEffectIcon_ToDraw);

		firstEffectIcon_ToDraw.addEventListener("load", function() {
			console.log("Effect Icon Loaded !");
			ctx.drawImage(firstEffectIcon_ToDraw, iconX1, iconY1, 85, 85);
			drawText();
		})
	}
	if(secondEffectIcon) {
		var secondEffectIcon_ToDraw = new Image(70, 70);
		secondEffectIcon_ToDraw.src = './icons/effects/' + secondEffectIcon + '.png';
		console.log(secondEffectIcon_ToDraw);

		secondEffectIcon_ToDraw.addEventListener("load", function() {
			console.log("Effect Icon Loaded !");
			ctx.drawImage(secondEffectIcon_ToDraw, iconX2, iconY2, 85, 85);
			drawText();
		})
	}
	if (firstEffectUnparsed) {
		console.log(document.getElementById('rendered-zone 1'));
		render_html_to_canvas(document.getElementById('rendered-zone 1').innerHTML, ctx, textX1, textY1, 600, 400);
	}
	if (secondEffectUnparsed) {
		console.log(document.getElementById('rendered-zone 2'));
		render_html_to_canvas(document.getElementById('rendered-zone 2').innerHTML, ctx, textX2, textY2, 600, 400);
	}
	if (quote) {
		console.log(document.getElementById('rendered-zone 3'));
		render_html_to_canvas(document.getElementById('rendered-zone 3').innerHTML, ctx, quoteX, quoteY, 700, 400);
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
	if (conceptName){
		ctx.fillStyle = 'gray';
		ctx.font = "italic 25px Verdana";
		ctx.textAlign = "center";
		ctx.fillText(conceptName,  550, 1030);
	}
	if (backgroundType != "SCENARIO") {
		ctx.fillStyle = 'gray';
		ctx.font = '25px Verdana';
		ctx.textAlign = "left";
		ctx.fillText("Kenomic Games", 20, 1030);
	}
}
