let weekDay = document.getElementById('WeekDay');
let clock = document.getElementById('Time');

var a = new Array("Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");  

function times(){
    var date=new Date();
    var str= date.getHours() +":"+ date.getMinutes();
    clock.innerHTML=str;
}

window.onload = function(){
	times();
	setInterval(times,1000);

	var week = new Date().getDay();  
	weekDay.innerText= a[week];  
}
