var global = {hasGet:{A:0, B:0, C:0, D:0, E:0}, isExcuting: 0};


$(function() {
	addListeners();
	reset();
});

function addListeners() {
	$('#button').mouseleave(function() {
		reset();
	});

	$('.apb').click(function() {
		$('#A').click();
	});

	$('#info-bar').click(function() {
		if (checkSum()) {
			$('#sum').html(calculateSum());
		}
	});

	$("#control-ring li").click(function() {
		var that = $(this).attr('id');
		if (1 != global.isExcuting) {
			global.isExcuting = 1;
			$(this).children('.unread').show();
			var curRingID = $(this).attr('id');
			$('#control-ring li').not('#'+curRingID).css('background','grey');
			//get number
			$.get("127.0.0.1",function(data) {
				$('#' + curRingID + ' .unread').html(data);
				global.hasGet[curRingID] = data;
				$('#control-ring li').not('#'+curRingID).css('background','#22459D');
				for (var key in global.hasGet) {
					if (0 != global.hasGet[key]) {
						$('#' + key).css('background', 'grey');
					} else {
						$('#' + key).css('background', '#22459D')
					}
				}
			global.isExcuting = 0;
			checkAndEnableSum();
			$(nextID('#' + that)).click();
			});
		}
	});
}

function reset() {
	for(var key in global.hasGet) global.hasGet[key] = 0;
		global.isExcuting = 0;
	$("#control-ring li").each(function() {
		$(this).css('background', '#22459D').children('.unread').hide();
	});
	$('#info-bar span').html('');
}

function checkAndEnableSum() {
	if (checkSum()) {
		$('#info-bar').css('background', '#22459D');
	}
}

function checkSum() {
	for (var key in global.hasGet) {
		if (0 == parseInt(global.hasGet[key])) return false;
	}
	return true;
}

function calculateSum() {
	var total = 0;
	for (var key in global.hasGet) {
		total += parseInt(global.hasGet[key]);
	}
	return total;
}
function nextID (lastID) {
	if (lastID == '#E') {
		return '#info-bar';
	} else {
		arr = ['#A', '#B', '#C', '#D', '#E'];
		return arr[arr.indexOf(lastID)+1];
	}
}