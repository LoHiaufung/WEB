var http = require('http');
var url = require('url');
// var fs = require('fs');
var querystring = require('querystring')
// var registerCss = fs.FileReaderSync('css/register.css');
// var detailCss = fs.FileReaderSync('css/detail.css');


var users=[];
var userCount = 0;
var currentName = "";

var errors = [];
var errorCount = 0;

function userObj(name, id, phone, email) {
	this.userName = name;
	this.studentID = id;
	this.phoneNum = phone;
	this.email = email;
	return;
}


function parseName(_url) {
	return querystring.parse(url.parse(_url).query).username;
}

http.createServer(function(request, response) {

	var user = parseName(request.url);
	console.log(request.url=='/logIn');
	console.log("receive Post:" + user);	
		if ((request.url == '/')){
			// index, register
			toRegisterPage(response);
		} else if (request.url == '/logIn') {
			// login
			// console.log('new User');
			addNewUser(request, response);
		} else if (undefined != findUserByName(user)) {
			// registered user, to detail
			toDetaiLPage(findUserByName(user));
		} else {
			// unregistered or unknown info, to register page
			toRegisterPage(response);
		}
		console.log(users);
}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');

function toRegisterPage(response) {
	  console.log("output Rigister Page");
	  response.writeHead(200, {"Content-Type": "text/html"});
	  response.write('<head><meta charset="utf-8"/></head>'); 
	  response.write("<!DOCTYPE html>");
	  response.write("<html>");
	  response.write("	<head>");
	  response.write("		<title>Register</title>");
	  response.write("	</head>");
	  response.write("<body>");
	  console.log("pre output error ： "+ errorCount);
	  console.log(errors);
	  if (0 !== errorCount) {
		  console.log("output error");
		 for (var i = 0; i < errorCount; i++) {
	  		response.write("<p> [error] " + errors[i] + "<p/>" );
	 	 }
		  errors = [];
		  errorCount = 0;
	  }
	  response.write("	<form action=\"http:\/\/localhost:8000/logIn\" method=\"post\">");
	  response.write("<h1>User Register</h1>");
	  response.write('<head><meta charset="utf-8"/></head>');  
	  response.write("<p>userName  : <input type=\"text\" name=\"userName\" /></p>");
	  response.write("<p>studentID : <input type=\"text\" name=\"studentID\" /></p>");
  	  response.write("<p>phoneNum  : <input type=\"text\" name=\"phoneNum\"/> </p>");
  	  response.write("<p>email     : <input type=\"text\" name=\"email\"/></p>");
  	  response.write("</p><input type=\"submit\" value=\"submit\"/> <input type=\"reset\" value=\"reset\"/></p>");
	  response.write("	</form>");
	  response.write("</body>");
	  response.write("</html>");
	  response.end();
}

function toDetaiLPage(user, response) {
	  if (undefined !== user) {
	  	  console.log('output detail page');
	  	  response.writeHead(200, {"Content-Type": "text/html"});
		  response.write("<!DOCTYPE html>");
		  response.write("<html>");
		  response.write("	<head>");
		  response.write("		<title>User Detail</title>");
		  response.write("	</head>");
		  response.write("<body>");
		  response.write("<h1>User Detail</h1>");
		  response.write("<p>userName  : "+ user.userName +"</p>");
		  response.write("<p>studentID : "+ user.studentID +"</p>");
	  	  response.write("<p>phoneNum  : "+ user.phoneNum +"</p>");
	  	  response.write("<p>email     : "+ user.email +"</p>");
		  response.write("</body>");
		  response.write("</html>");
		  response.end();
	  }
}

function addNewUser(request, response) {
	console.log('receive POST to creat new user');
	var info='';
	request.addListener('data', function(chunk){
		info+=chunk;
	})
	.addListener('end', function(){
		if ('' != info) {
			errors = [];
			errorCount = 0;
			info = querystring.parse(info);
			 console.log(info);
			if (true === checkNewUser(info)) { 
				users[userCount] = new userObj(info.userName, info.studentID, info.phoneNum, info.email);
				currentName=users[userCount].userName;
				userCount++;
				toDetaiLPage(findUserByName(currentName), response);
				console.log('create user successfully');
			} else {
				toRegisterPage(response);
				console.log('create user failed');
			}
		}
	});
}

function checkNewUser(user) {
	
	if (!isUsernameValid(user.userName)) return false;
	if (isUsernameUsed(user.userName)) return false;
	if (!isStudentIDValid(user.studentID)) return false;
	if (isStudentIDUsed(user.studentID)) return false;
	if (!isPhoneNumValid(user.phoneNum)) return false;
	if (isPhoneNumUsed(user.phoneNum)) return false;
	if (!isEmailValid(user.email)) return false;
	if (isEmailUsed(user.email)) return false;
	
	return true;
}

function findUserByName(name) {
	for (var i = 0; i < userCount; i++) {
		if (name == users[i].userName) return users[i];
	}
	return undefined;
}

function isUsernameUsed(name) {
	for (var i = 0; i < userCount; i++) {
		if (name == users[i].userName)  {
			addErrorRecord("Username used!");
			return true;
		}
	}
	return false;
}

function isUsernameValid(name) {
	if (true == /^[a-zA-Z]\w{5,17}$/.test(name)) {
		return true;
	} else {
		addErrorRecord("用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
		return false;
	}
}

function isStudentIDUsed(id) {
	for (var i = 0; i < userCount; i++) {
		if (id == users[i].studentID)  {
			addErrorRecord("StudentID used!");
			return true;
		}
	}
	return false;
}

function isStudentIDValid(id) {
	if (true == /[1-9]\d{7}/.test(id)) {
		return true;
	} else {
		addErrorRecord("学号8位数字，不能以0开头");
		return false;
	}
}

function isPhoneNumUsed(phone) {
	for (var i = 0; i < userCount; i++) {
		if (phone == users[i].phoneNum)  {
			addErrorRecord("Phone number used!");
			return true;
		}
	}
	return false;
}

function isPhoneNumValid(phone) {
	if (true == /[1-9]\d{10}/.test(phone)) {
		return true;
	} else {
		addErrorRecord("电话11位数字，不能以0开头");
		return false;
	}
}

function isEmailUsed(email) {
	for (var i = 0; i < userCount; i++) {
		if (email == users[i].email)  {
			addErrorRecord("Email used!");
			return true;
		}
	}
	return false;
}

function isEmailValid(email) {
	// format from lecture slide
	if (/^[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]+\.)+[a-zA-Z]{2,4}$/.test(email)) {
		// console.log('email');
		return true;
	} else {
		addErrorRecord("Invalid Emailname!");
		return false;
	}
}

function addErrorRecord(error) {
	errors[errorCount] = error;
	errorCount++;
}
