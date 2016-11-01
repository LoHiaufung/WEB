var time = 0;
var score = 0;
var begin = false;
var timeID;

$(function () {
	// draw holes and add event
	_.times(60,function() {$("<div></div>").attr("class", "hole").click(clickTheHole).appendTo("#map");});
	$("#start").click(clickTheStart);
});

function clickTheHole(event) {
	if (time > 0 && begin === true) {
		if(event.target.id === "mouse") {
			score++;
			event.target.id = "hitten";
			setTimeout(function (target) {target.id ="";}, 200, event.target);
			newMouse();
		} else {
			if (score> 0) score--;
		}
 	}
 	showData();
}

function newMouse() {
	var ithMouse = _.random(0,59);
	while ($(".hole")[ithMouse].id === "hitten") {
		ithMouse = _.random(0, 59);
	}
	$(".hole")[ithMouse].id = "mouse";
}


function showData() {
	$("#time").val(time);
	$("#score").val(score);
}

function clickTheStart() {
	if (begin == false) {
		begin = true;
		time = 30;
		score = 0;
		$("#result").val("Game Start");
		timeID = setInterval(timeGo, 1000);
		if (time > 0) newMouse();
	} else {
		begin = false;
		time = 0;
		$("#result").val("Game Over");
		alert("game over!");
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
	var mice = $('#map div');
	mice.each(function(index){this.id = "";})
}