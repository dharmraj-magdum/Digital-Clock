console.log("script is running good!!");

//get HTML ele from doc
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const am_pm = document.getElementById("am-pm");
const greeting = document.getElementById("greeting");
const queto = document.getElementById("queto-text");
const wallpaper = document.getElementById("wallpaper");
//---
let prevHour = null;
//---
function currentTime() {
	const now = new Date();
	let hr = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();
	let pm = false;
	if (hr >= 12) {
		if (hr > 12) {
			hr -= 12;
		}
		pm = true;
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
	am_pm.innerText = pm ? "PM" : "AM";

	//now set queto and images according to time
	if (hr != prevHour) {
		if (hr >= 10 && hr < 12 && pm == false) {
			greeting.innerText = "GOOD MORNING!! WAKE UP !!";
			queto.innerText = "GRAB SOME HEALTHY BREAKFAST!!!";
			wallpaper.style.backgroundImage = "url('assets/Group_5183-1.svg')";
		} else if (hr >= 12 && hr - 12 < 1 && pm == true) {
			greeting.innerText = "GOOD AFTERNOON !! TAKE SOME SLEEP";
			queto.innerText = "LET'S HAVE SOME LUNCH !!";
			wallpaper.style.backgroundImage = "url('assets/Group_5183.svg')";
		} else if (hr >= 4 && hr < 5 && pm == true) {
			greeting.innerText = "GOOD EVENING !!";
			queto.innerText = "STOP YAWNING, GET SOME TEA.. ITS JUST EVENING!";
			wallpaper.style.backgroundImage = "url('assets/lunch_image.png')";
		} else if (hr >= 8 && pm == true) {
			greeting.innerText = "GOOD NIGHT !!";
			queto.innerText = "CLOSE YOUR EYES AND GO TO SLEEP";
			wallpaper.style.backgroundImage =
				"url('assets/goodnight_image.svg')";
		}
	}
	if (prevHour == null) {
		prevHour = hr;
	}
}
currentTime();
//call the currentTime fun every 1000mil secs
setInterval(currentTime, 1000);

//
