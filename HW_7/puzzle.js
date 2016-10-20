// record the position of each square
var puzzleArr;
var begin;

window.onload = function () {
	initialize();
}

function initialize() {
	placeSquare();
	document.getElementById("restart").addEventListener('click', replaceSquare);
	document.getElementById("reset").addEventListener('click', reset);
}

function placeSquare() {

	// initial the array
	puzzleArr = [0, 1, 2, 3];
	puzzleArr[0] = new Array(1, 2, 3, 4);
	puzzleArr[1] = new Array(5, 6, 7, 8);
	puzzleArr[2] = new Array(9, 10, 11, 12);
	puzzleArr[3] = new Array(13, 14, 15, 16);

	// place new squares
	var gameArea = document.getElementById("gameArea");
	var square;
	for (var i = 1; i <= 16; i++) {
		square = document.createElement('div');
		square.id='s' + i;
		square.className = "puzzleSquare";
		square.addEventListener('click', clickSquare);
		gameArea.appendChild(square);
	}
}

function replaceSquare() {
	begin = true;
	randomPlace();
}
function reset() {
	begin = false;
	puzzleArr[0] = new Array(1, 2, 3, 4);
	puzzleArr[1] = new Array(5, 6, 7, 8);
	puzzleArr[2] = new Array(9, 10, 11, 12);
	puzzleArr[3] = new Array(13, 14, 15, 16);
	var squares = document.getElementsByClassName("puzzleSquare");
	for (var i = 0; i <squares.length; i++) {
		squares[i].id = "s"+(1 + i);
	}
}
function clickSquare(event) {
	if (true === begin) {
		var squareID = parseInt(event.target.id.substring(1));
		var row = getRow(squareID);
		var col = getCol(squareID);
		var blankRow = -1, blankCol = -1;
		if (col - 1 >= 0 && puzzleArr[row][col - 1]===16) {blankRow = row; blankCol = col - 1;}
		else if (col + 1 <=  3 && puzzleArr[row][col + 1]===16) {blankRow = row; blankCol = col + 1;}
		else if (row - 1 >= 0 && puzzleArr[row-1][col]===16) {blankRow = row - 1; blankCol = col;}
		else if (row + 1 <= 3 && puzzleArr[row+1][col]===16) {blankRow = row + 1; blankCol = col;}
		
		// change position
		if (blankRow > -1 && blankCol > -1) {
			var tmp_blank = document.getElementById(coordinateToId(blankRow, blankCol));
			var tmp_square = document.getElementById(coordinateToId(row, col));
			var tmp_blankID = tmp_blank.id;
			var tmp_squareID = tmp_square.id;
			tmp_blank.id = tmp_squareID;
			tmp_square.id = tmp_blankID;

			var tmp = puzzleArr[row][col];
			puzzleArr[row][col] = puzzleArr[blankRow][blankCol];
			puzzleArr[blankRow][blankCol] = tmp;

			if (true === finished()) {
				alert("You win!");
			}
		}
	}	
}

function coordinateToId(row, col) {
	return "s" + puzzleArr[row][col];
}

function getRow(id) {
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 4; col++) {
			if (id === puzzleArr[row][col]) return row;
		}
	}
}

function getCol(id) {
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 4; col++) {
			if (id === puzzleArr[row][col]) return col;
		}
	}
}

function finished() {
	if (begin === true) {
		for (var row = 0; row < 4; row++) {
			for (var col = 0; col < 4; col++) {
				if (row * 4 + col + 1 === puzzleArr[row][col]) return false;
			}
		}
		begin = false;
		return true;
	}
	return false;
}

function randomPlace() {
	var arr = new Array(16);
	var tmp = -1;
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 4; col++) {
			tmp = Math.floor(Math.random() * 100) % 16 + 1;
			while(-1 !== arr.indexOf(tmp)) {
				tmp = Math.floor(Math.random() * 100) % 16 + 1;
			}
			arr[row * 4 + col] = tmp;
			puzzleArr[row][col] = tmp;
		}
	}
	
	var squares = document.getElementsByClassName("puzzleSquare");
	for (var i = 0; i <squares.length; i++) {
		squares[i].id = "s"+(arr[i]);
	}
}

