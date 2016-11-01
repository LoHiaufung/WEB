var time = 0;
var score = 0;
var begin = false;
var timeID;

window.onload = function () {
	drawMole();
	initial();
}

function drawMole()  {
	var newMole;
	var map = document.getElementById("map");
	for (var i = 0; i < 60; i++) {
		newMole = document.createElement("div");
		newMole.className = "hole";
		newMole.addEventListener('click', clickTheHole);
		map.appendChild(newMole);	
	}
}

function clickTheHole(event) {
	if (time > 0 && begin == true) {
		if(event.target.id == "mouse") {
			score++;
			event.target.id = "hitten";
			setTimeout(mouseHitten, 200, event.target);
			// setTimeout(newMouse,200);
			newMouse();
		} else {
			score--;
		}
 	}
 	showData();
}

function mouseHitten(target) {
	target.id ="";
}

function newMouse() {
	var ithMouse = Math.floor(Math.random()*60);
	document.getElementsByClassName("hole")[ithMouse].id = "mouse";
}

function initial() {
	document.getElementById("start").addEventListener('click', clickTheStart);
}
function showData() {
	document.getElementById("time").value = time;
	document.getElementById("score").value = score;
}

function clickTheStart() {
	if (begin == false) {
		begin = true;
		time = 30;
		score = 0;
		document.getElementById("result").value = "Game Start";
		timeID = setInterval(timeGo, 1000);
		if (time > 0) newMouse();
	} else {
		begin = false;
		time = 0;
		document.getElementById("result").value = "Game Over";
		clearAllMouse();
		clearInterval(timeID);
	}
}

function timeGo() {
	time--;
	if (time <= 0) {
		begin = true;
		clickTheStart();
	}
	showData();
}

function clearAllMouse() {
	var mice = document.getElementById('mouse');
	mice.id = "";
}