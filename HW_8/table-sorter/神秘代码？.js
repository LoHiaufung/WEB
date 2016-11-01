$(function(){
	$('th').attr('class','unclick').click(clickTableHead(){
			if ($(this).attr('class') === 'unclick') {
		$(this).attr('class', 'ascend').siblings().each(function() {$(this).attr('class','unclick');});
	} else if ($(this).attr('class') === 'ascend') {
		$(this).attr('class', 'descend').siblings().each(function() {$(this).attr('class','unclick');});
	} else if ($(this).attr('class') === 'descend') {
		$(this).attr('class', 'ascend').siblings().each(function() {$(this).attr('class','unclick');});
	}

	var col = $("th").index(this);
	// table To-Do
		var tablerows = document.getElementsByTagName('table').rows;
		for (var i = 1; i < tablerows.length; i++) {
			for (var j = 2; j < tablerows.length + 1; j++) {
				if (true === comp(tablerows[j-1].cells[col].innerHTML,tablerows[j].cells[col].innerHTML, $(this).attr('class'))) swap(tablerows[j-1], tablerows[j]);
			}
		}
	});
});


// table
// ______
// |str1|
//-------
// |str2|
//_______
function comp(str1, str2, mode) {
	if (mode === "descend") {
		return str1 < str2;
	} else {
		return str1 > str2;
	}
}

function swap(row1, row2) {
	var tmp = row1.innerHTML;
	row1.innerHTML = row2.innerHTML;
	row2.innerHTML = tmp;
}