/*
打了一堆判断的，正准备中缀转后缀，再求值才发现有求值函数可以调用，GG
*/


var display = "";
/*
// 判断一个字符是否为数字
function isDig(c) {
	if (c === '0' || c === '1' || c === '2' || c === '3' || c === '4' || c === '5'
		|| c === '6' || c === '7' || c === '8'|| c === '9') {
		return true;
	} else {
		return false;
	}
}

// 判断一个char是否小数点
function isPoint(c) {
	return (c === '.');
}

// char 是否运算符
function isOperator(c) {
	if (c === '+' || c === '-' || c === '*' || c === '/') {
		return true;
	} else {
		return false;
	}
}

//判断一个由数字和.组成的字符串是否是一个合法的数
function isValidNum(str) {
	var pointNum = 0;

	// 小数点是否多于一个
	for (var i = 0; i > str.length; i++) {
		if (true === isPoint(str[i])) {
			pointNum++;
		}
	}
	if (pointNum > 1) {
		return false;
	}

	// 小数点是否在头或尾
	if (true === isPoint(str[0]) || true === isPoint(str[str.length - 1])) {
		return false;
	}

	return true;
}

/*
// 中缀转后缀并算结果
function computer (exp) {
	if (false == isValid(exp)) {
		return "Syntax Error!";
	} else {
		return "Correct Syntax!";
	}
}
*/
/*
// 中缀表达式是否合法
function isValid(exp) {
	// 当表达式为空
	if (0 === exp.length) {return true;}

	// 括号是否匹配
	var bracketMatch = 0;
	for (var i = 0; i < exp.length; i++) {
		if (exp[i] === '(') {
			bracketMatch++;
		} else if (exp[i] === ')') {
			bracketMatch--;
		}

		//右括号在左括号之左
		if (bracketMatch < 0 ) {
			return false;
		}
	}
	if (bracketMatch === 0) {
		return true;
	} else {
		return false;
	}

	// 为了简化处理，表达式首、尾为运算符视为错误表达式
	if (ture === isOperator(exp[0]) || true === isOperator(exp[exp.length - 1])) {return false;}

	// 检查每个数是否合法

	// 检查运算符的运算对象是否合法
	for (var i = 1;i < (exp.length - 1); i++) {
		if (true === isOperator(exp[i])) {
			if (false === isDig(exp[i-1]) || false === isDig(exp[i+1])) {
				return false;
			}
		}
	}
}

*/

// 按按钮，显示对应结果
window.onload = function() {
	document.getElementById("num7").onclick = function() {
		display += "7";
		document.getElementById("screen").value = display;
	}

	document.getElementById("num8").onclick = function() {
		display += "8";
		document.getElementById("screen").value = display;
	}

	document.getElementById("num9").onclick = function() {
		display += "9";
		document.getElementById("screen").value = display;
	}

	document.getElementById("divide").onclick = function() {
		display += "/";
		document.getElementById("screen").value = display;
	}

	document.getElementById("num4").onclick = function() {
		display += "4";
		document.getElementById("screen").value = display;
	}

	document.getElementById("num5").onclick = function() {
		display += "5";
		document.getElementById("screen").value = display;
	}

	document.getElementById("num6").onclick = function() {
		display += "6";
		document.getElementById("screen").value = display;
	}

	document.getElementById("multiply").onclick = function() {
		display += "*";
		document.getElementById("screen").value = display;
	}

	document.getElementById("num1").onclick = function() {
		display += "1";
		document.getElementById("screen").value = display;
	}

	document.getElementById("num2").onclick = function() {
		display += "2";
		document.getElementById("screen").value = display;
	}

	document.getElementById("num3").onclick = function() {
		display += "3";
		document.getElementById("screen").value = display;
	}

	document.getElementById("subtract").onclick = function() {
		display += "-";
		document.getElementById("screen").value = display;
	}

	document.getElementById("num0").onclick = function() {
		display += "0";
		document.getElementById("screen").value = display;
	}

	document.getElementById("point").onclick = function() {
		display += ".";
		document.getElementById("screen").value = display;
	}

	document.getElementById("back").onclick = function() {
		display = display.substring(0, display.length - 1);
		document.getElementById("screen").value = display;
	}

	document.getElementById("plus").onclick = function() {
		display += "+";
		document.getElementById("screen").value = display;
	}

	document.getElementById("leftBacket").onclick = function() {
		display += "(";
		document.getElementById("screen").value = display;
	}

	document.getElementById("rightBacket").onclick = function() {
		display += ")";
		document.getElementById("screen").value = display;
	}

	document.getElementById("clear").onclick = function() {
		display = "";
		document.getElementById("screen").value = display;
	}

	document.getElementById("equal").onclick = function() {
		if (display != "") {
			try  {
    			document.getElementById("screen").value = display = "" + eval(display);
    		 }

			catch(exception) {
	    		 	alert("表达式错误！");
	    		 	document.getElementById("screen").value  = display = "";
	   		}
    	}
	}
}

