

//create array for the employee's userID and password
var employeeArray = [[
  223456, "1Password1"
  ],
  [
  224333, "2Password2"
  ],
  [
  330000, "3Password3"
  ]];
 //create global variable to keep track of which employee is logged in
var j = 0;

//create a boolean variable for clocking in and out to keep track of employees

//create array to record time records for each employee
var timerecord = [[
  employeeArray[0][0], "2017/10/17", "12:03:33", "out"
],
[
  employeeArray[1][0], "2017/10/17", "12:03:33", "out"
],
[
  employeeArray[2][0], "2017/10/17", "12:03:33", "out"
]];

//function for validating employee ID credentials
function validateemployeeinput()
{
//declare variables for the function	
var login = "login";
var pass = "passwordinput";	
var input = document.getElementById("employeeinput").value;
 //check to make sure the user has input something, else display an error message
 if (input.length == 0)
	{
	producePrompt("Employee ID required", "employeeinputPrompt", "red");
		//make the login button disabled
		enableFunction(true, login);	
		return true;
	}
 //search through the array for invalid responses and update the user as they type with error message
 for (j = 0; j < employeeArray.length; j++) {	 
     if (!input.match(employeeArray[j][0]))	
	{
	 producePrompt("Invalid employee ID", "employeeinputPrompt", "red");
		//keep the login button disabled
		enableFunction(true, login);	
	}
	}
	//search through the array for a match
	for (j = 0; j < employeeArray.length; j++) {

     if (input.match(employeeArray[j][0]))	
	{
	 //if a match is found, update the message to green and valid
	 producePrompt("Valid employee ID", "employeeinputPrompt", "green");

	//enable the password field after the employee ID is validated
	enableFunction(false, pass);
	//return the index of the array for the employee ID validated
	return j;	
	}
	}
}
//function for validating the password
function validatepasswordinput()
{
	//declare local variables for the function
	var k = validateemployeeinput()	
	var login = "login";	
	var inputp = document.getElementById("passwordinput").value;
 //make sure the user is inputing something into the field or display an error message
 if (inputp.length == 0)
	{
	producePrompt("Password required", "passwordinputPrompt", "red");
	//keep the login function disabled
	enableFunction(true, login);		
		return true;
	}
//search through the employee array for invalid passwords and display error message as user types
 for (i = 0; i < employeeArray.length; i++) {	 
     if (!inputp.match(employeeArray[i][1]))	
	{
	 producePrompt("Password invalid", "passwordinputPrompt", "red");
	//keep the login button disabled
	enableFunction(true, login);	 
	}
	}
	//search through the array for a valid password
for (i = 0; i < employeeArray.length; i++) {
	
     if (inputp.match(employeeArray[k][1]))	
	{
	//if the password is valid, display a good message
	 producePrompt("Valid password", "passwordinputPrompt", "green");
	//check to make sure the employee ID is still valid
	if (document.getElementById("employeeinputPrompt").innerHTML == "Valid employee ID")
	{
	//enable the login button
	enableFunction(false, login);	 
	}
	//display an alert for the user per the requirements
	alert("You have logged in as Empoloyee ID#" + employeeArray[k][0]);
	}
	}
}
//this is a function to enable/disable elements in the form
function enableFunction(enabled, elementid) {	
    document.getElementById(elementid).disabled = enabled;		
}
  
//this function displyas messages for the user in the correct location
function producePrompt(message, promptLocation, color)
 {
	 document.getElementById(promptLocation).innerHTML = message;
	 document.getElementById(promptLocation).style.color = color;
 }
//this function enables the clock in button, but not the clock out button
function enabletimeFunction(){
		
	 document.getElementById("clockin").disabled = false;
	 
	 document.getElementById("clockout").disabled = true;
	 //hide the login button since it is no longer needed
	 document.getElementById("login").style.display = "none";
	 //pass the employee id into the function
	 var l = validateemployeeinput()
	 // display the saved time records for the employee	 
	 for (i = 0; i < timerecord.length; i++) {
		 if (timerecord[i][0] == employeeArray[l][0]){			 
		 createtablerow(timerecord[i][1], timerecord[i][2], timerecord[i][3]);		
		 }
	 }
	 return false;
	 }
 
 //functino used for successive clock in button clicks
 function gettimein(){	  
	 //pass the employee id into the function	 
	 var l = validateemployeeinput()
	 var inorout = "out"; 
	//get the current time 	 
	var d = new Date(); 
	var h = d.getHours(); 
	var m = d.getMinutes(); 
	var s = d.getSeconds(); 
	var day = d.getDate();	
	var month = (d.getMonth()+1);
	var year = d.getFullYear();
	var date = (year + "/" + month + "/" + day);
	var time = (h + ":" + m + ":" + s);
	inorout = "in";
	
//adjust which buttons are enabled/disabled	
document.getElementById("clockout").disabled = false;
document.getElementById("clockin").disabled = true;
//insert the table row for the time just logged
createtablerow(date, time, inorout);
//place the data into the time array where it should go chronologically so it can be displayed in order
timerecord.splice((timerecord.length - 1),0,[employeeArray[l][0], date, time, inorout]); 
 
//display the clock out button for the first time
document.getElementById("clockout").style.display = "inline";
	 return false;
 }
 //this function is for logging clock out button clicks
 function gettimeout(){
	 //pass in the variable for the employee ID
	 var l = validateemployeeinput()
	//get the current time 
	var d = new Date(); 	
	var h = d.getHours(); 
	var m = d.getMinutes(); 
	var s = d.getSeconds(); 
	var day = d.getDate();	
	var month = (d.getMonth()+1);
	var year = d.getFullYear();
	var date = (year + "/" + month + "/" + day);
	var time = (h + ":" + m + ":" + s);
	var inorout = "out";
	//make the buttons enabled/disabled
	document.getElementById("clockout").disabled = true;
	document.getElementById("clockin").disabled = false;
	//insert the table row for the time just logged
	createtablerow(date, time, inorout);
	//place the data into the time array where it should go chronologically so it can be displayed in order
	timerecord.splice((timerecord.length - 1),0,[employeeArray[l][0], date, time, inorout]);
	 return false;
 }
 //this function is used to insert rows into the webpage
 function createtablerow(date, time, inorout)
 {
	var table = document.getElementById("myTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
    cell1.innerHTML = date;
    cell2.innerHTML = time;
	cell3.innerHTML = inorout;
 }
 
 