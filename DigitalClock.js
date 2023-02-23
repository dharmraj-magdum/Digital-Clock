//get HTML ele from doc
const hourEle = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const am_pm = document.getElementById("am-pm");
const greeting = document.getElementById("greeting");
const queto = document.getElementById("queto-text");
const wallpaper = document.getElementById("wallpaper");
const alarm = document.getElementById("alarm");
const time_table = document.getElementById("time-table");
//--- select input elements
const wakeup_time = document.getElementById("wakeup-time");
const lunch_time = document.getElementById("lunch-time");
const nap_time = document.getElementById("nap-time");
const night_time = document.getElementById("night-time");
//---
let hour;
let min;
let sec;
let timeUnit;
let timeEventArray = new Array(4);

//////////////////
//---
function currentTime() {
	const now = new Date();
	hour = now.getHours();
	min = now.getMinutes();
	sec = now.getSeconds();
	timeUnit = "PM";
	if (hour >= 12) {
		if (hour > 12) {
			hour -= 12;
		}
		timeUnit = "PM";
	}
	if (min <= 9) {
		min = "0" + min;
	}
	if (sec <= 9) {
		sec = "0" + sec;
	}
	//now set the time
	hourEle.innerText = hour;
	minute.innerText = min;
	second.innerText = sec;

	am_pm.innerText = timeUnit;

	setMessage(hour, timeUnit);
}

function setMessage(hour, timeUnit) {
	if ((hour >= 10 || hour < 12) && timeUnit === "AM") {
		queto.innerText = "GRAB SOME HEALTHY BREAKFAST";
	} else if ((hour >= 12 || hour < 04) && timeUnit === "PM") {
		queto.innerText = `LET'S HAVE SOME LUNCH !!`;
	} else if ((hour >= 04 || hour < 08) && timeUnit === "PM") {
		queto.innerText = "STOP YAWNING, GET SOME TEA.. ITS JUST EVENING!";
	} else {
		queto.innerText = "CLOSE YOUR EYES AND GO TO SLEEP";
	}
}

//set time table small box to show
function setTimeTable() {
	//==================================================
	//set time table box in bottom as selectd times
	let PtagArr = document
		.getElementById("time-table")
		.getElementsByTagName("p");
	for (let i = 0; i < 4; i++) {
		//if the alarm for particular session is not selected yet
		if (timeEventArray[i] == null) {
			continue;
		}
		// 1]P-wakeup==1]timeText-wakeup
		//then set its time in object xAM-yPM
		PtagArr[i].getElementsByTagName("span")[1].innerText =
			timeEventArray[i].timeEvent;
	}
	//==================================================
	//now set wallpaper and greetings acording to alarm and actual time
	for (let i = 0; i < timeEventArray.length; i++) {
		//if the alarm for particular session is not selected yet
		if (timeEventArray[i] == null) {
			continue;
		}
		// console.log(
		// 	timeEventArray[i].timeEvent.split(" ")[0].includes(hour)
		// );
		// console.log(
		// 	timeEventArray[i].timeEvent.split(" ")[1].includes(timeUnit)
		// );
		// 08 AM - 09 AM split on " "
		//->[08,AM,-,09,AM]
		if (
			timeEventArray[i].timeEvent.split(" ")[0].includes(hour) &&
			timeEventArray[i].timeEvent.split(" ")[1].includes(timeUnit)
		) {
			if (timeEventArray[i].timeText === "Wake Up Time :") {
				greeting.innerText = "GOOD MORNING!! WAKE UP !!";
				wallpaper.style.backgroundImage =
					"url('assets/Group_5183-1.svg')";
			} else if (timeEventArray[i].timeText === "Lunch Time :") {
				greeting.innerText = "GOOD AFTERNOON !! HAVE YOUR LUNCH";
				wallpaper.style.backgroundImage =
					"url('assets/Group_5183.svg')";
			} else if (timeEventArray[i].timeText === "Nap Time :") {
				greeting.innerText = "GOOD EVENING !!";
				wallpaper.style.backgroundImage =
					"url('assets/lunch_image.png')";
			} else if (timeEventArray[i].timeText === "Night Time :") {
				greeting.innerText = "GOOD NIGHT !!";
				wallpaper.style.backgroundImage =
					"url('assets/goodnight_image.svg')";
			} else {
				greeting.innerText = "TAKE CARE OF YOUR HEALTH!!!";
			}
		}
	}
}

wakeup_time.addEventListener("change", function (event) {
	let obj = {
		timeText: "Wake Up Time :",
		timeEvent: event.target.selectedOptions[0].innerText,
	};

	timeEventArray[0] = obj;
});

lunch_time.addEventListener("change", function (event) {
	let obj = {
		timeText: "Lunch Time :",
		timeEvent: event.target.selectedOptions[0].innerText,
	};

	timeEventArray[1] = obj;
});

nap_time.addEventListener("change", function (event) {
	let obj = {
		timeText: "Nap Time :",
		timeEvent: event.target.selectedOptions[0].innerText,
	};

	timeEventArray[2] = obj;
});

night_time.addEventListener("change", function (event) {
	let obj = {
		timeText: "Night Time :",
		timeEvent: event.target.selectedOptions[0].innerText,
	};

	timeEventArray[3] = obj;
});

//for initial render
currentTime();

//=============
//call the currentTime fun every 1000mil secs
setInterval(currentTime, 1000);

// button to set alarm / time-table
alarm.addEventListener("click", setTimeTable);

console.log("script is running good!!");
