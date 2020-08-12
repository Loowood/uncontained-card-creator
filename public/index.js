var canvas;
var ctx;

window.onload =  function () {
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
}

function alerting() {
	ctx.fillStyle = 'green';
	ctx.fillRect(10, 10, 480, 480);
}