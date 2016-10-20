var begin = false;
var pass = false;
var fail =true;
var win = false;

window.onload = function() {
	addListener();
}

function addListener() {
	document.getElementById("start").addEventListener('mouseover', mouseIntoStart);
	document.getElementById("end").addEventListener('mouseover', mouseIntoEnd);
	var walls = document.getElementsByClassName("wall");
	for (var i = 0; i < walls.length; i++) {
		walls[i].addEventListener('mouseover', mouseIntoWall);
		walls[i].addEventListener('mouseout', mouseOutOfWall);
	}
	document.getElementById("path5").addEventListener('mouseover', mouseOverLastPath);
	
}
 
function mouseIntoStart() {
	if(win == true || fail == true) {
		pass = false;
		fail = false;
		begin = true;
		outputResult("");
		document.getElementById("result").style.fontSize= "40px";
	}
}

function mouseIntoEnd() {
	if (fail == false ) { 
		if (pass == true) {
			win = true;
			outputResult("You Win");
		} else {
			document.getElementById("result").style.fontSize= "30px";
			outputResult("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
		}
	}
}

function mouseIntoWall(event) {
	if (begin == true) {
		outputResult("You Fail");
		event.target.style.background = "red";
		fail = true;
	}
}
function mouseOutOfWall(event) {
	event.target.style.background = "purple";
}
function mouseOverLastPath() {
	if (true == begin && fail != true) {
		pass = true;
	}
}
function outputResult(message) {
	document.getElementById("result").textContent = message;
}