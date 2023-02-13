console.log("script is running good!!");

//get HTML ele from doc
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const am_pm = document.getElementById("am-pm");
const greeting = document.getElementById("greeting");
const queto = document.getElementById("queto-text");
const wallpaper = document.getElementById("wallpaper");
const alarm = document.getElementById("alarm");
//---
const wakeup_time = document.getElementById("wakeup-time");
const lunch_time = document.getElementById("lunch-time");
const nap_time = document.getElementById("nap-time");
const night_time = document.getElementById("night-time");
const time_table = document.getElementById("time-table");
//---
let AMPM;
var WAKEUP = [0, 0];
var LUNCH = [0, 0];
var NAP = [0, 0];
var NIGHT = [0, 0];
//---
function currentTime() {
	const now = new Date();
	let hr = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();
	let pm = false;
	let am = true;
	if (hr >= 12) {
		if (hr > 12) {
			hr -= 12;
		}
		pm = true;
		am = false;
	}
	if (min <= 9) {
		min = "0" + min;
	}
	if (sec <= 9) {
		sec = "0" + sec;
	}
	//now set the time
	hour.innerText = hr;
	minute.innerText = min;
	second.innerText = sec;
	AMPM = pm ? "PM" : "AM";
	am_pm.innerText = AMPM;

	//now set queto and images according to time
	if (hr >= WAKEUP[0] && hr < WAKEUP[1] && am == true) {
		// console.log(hr, "WAKEUP", WAKEUP, " am-", am, " pm-", pm);
		greeting.innerText = "GOOD MORNING!! WAKE UP !!";
		queto.innerText = "GRAB SOME HEALTHY BREAKFAST!!!";
		wallpaper.style.backgroundImage = "url('assets/Group_5183-1.svg')";
	} else if (hr >= LUNCH[0] && hr < LUNCH[1] && pm == true) {
		// console.log(hr, "LUNCH", LUNCH, " am-", am, " pm-", pm);
		greeting.innerText = "GOOD AFTERNOON !! TAKE SOME SLEEP";
		queto.innerText = "LET'S HAVE SOME LUNCH !!";
		wallpaper.style.backgroundImage = "url('assets/Group_5183.svg')";
	} else if (hr >= NAP[1] && hr < NAP[1] && pm == true) {
		// console.log(hr, "NAP", NAP, " am-", am, " pm-", pm);
		greeting.innerText = "GOOD EVENING !!";
		queto.innerText = "STOP YAWNING, GET SOME TEA.. ITS JUST EVENING!";
		wallpaper.style.backgroundImage = "url('assets/lunch_image.png')";
	} else if (hr >= NIGHT[0] && pm == true) {
		// console.log(hr, "NIGHT", NIGHT, " am-", am, " pm-", pm);
		greeting.innerText = "GOOD NIGHT !!";
		queto.innerText = "CLOSE YOUR EYES AND GO TO SLEEP";
		wallpaper.style.backgroundImage = "url('assets/goodnight_image.svg')";
	} else {
		// console.log(hr, " am-", am, " pm-", pm);
	}
}

//set time table small box to show
function setTimeTable() {
	let wakupTime = wakeup_time.value.split("-");
	let lunchTime = lunch_time.value.split("-");
	let napTime = nap_time.value.split("-");
	let nightTime = night_time.value.split("-");
	time_table.innerHTML = `<div><small>Wake Up Time : ${wakupTime[0]}-${wakupTime[1]} </small><br>
	            <small>Lunch Time : ${lunchTime[0]}-${lunchTime[1]}</small><br>
	            <small>Nap Time : ${napTime[0]}-${napTime[1]}</small><br>
	            <small>Night Time : ${nightTime[0]}-${nightTime[1]}</small></div>`;

	//get setted alars to change queto and image
	WAKEUP[0] = getHourFromString(wakupTime[0]);
	WAKEUP[1] = getHourFromString(wakupTime[1]);
	LUNCH[0] = getHourFromString(lunchTime[0]);
	LUNCH[1] = getHourFromString(lunchTime[1]);
	NAP[0] = getHourFromString(napTime[0]);
	NAP[1] = getHourFromString(napTime[1]);
	NIGHT[0] = getHourFromString(nightTime[0]);
	NIGHT[1] = getHourFromString(nightTime[1]);
	// console.log(WAKEUP);
	// console.log(LUNCH);
	// console.log(NAP);
	// console.log(NIGHT);
	currentTime();
}

function getHourFromString(str) {
	if (str.includes("AM")) {
		return str.split("AM")[0];
	} else {
		return str.split("PM")[0];
	}
}

//for initial render
currentTime();
setTimeTable();

//=============
//call the currentTime fun every 1000mil secs
setInterval(currentTime, 1000);

// button to set alarm / time-table
alarm.addEventListener("click", setTimeTable);
