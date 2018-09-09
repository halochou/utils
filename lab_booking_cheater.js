s = document.createElement('script'); 
s.src = 'http://alexschneider.github.io/pushbullet-js/pushbullet.min.js'; 
document.body.appendChild(s)



PushBullet.APIKey = 'o.Zkn3j6ZYxSkRpNnSor8aJW3PN4Uv2ifV';

checkInterval = 10000

window.customEvent = new Event("nextWeek");
window.weekToCheck = 0;
window.weekGenerators = [doGenerateCurWeekAppointmentTimes, doGenerateNextWeekAppointmentTimes, doGenerateNextWeekAppointmentTimes]
window.addEventListener("nextWeek", generateWeekAppointmentTimes, false);

function generateWeekAppointmentTimes () {
	window.weekGenerators[window.weekToCheck]();
	window.weekToCheck = (window.weekToCheck + 1) % 3;
	setTimeout( checkValid, 500 );
}

function checkValid() {
	var valids = document.getElementsByClassName("valid");
	if(valids.length == 0) {
		setTimeout( function() {
				window.dispatchEvent(window.customEvent);
			} , (window.weekToCheck == 0) ? checkInterval : 500 );
	} else {
		for( var i = 0; i < valids.length; i++ ){
			var day = new Date(valids[i].getAttribute("date"));
			var time = valids[i].getAttribute("time");
			if( (day.getDay() < 6 && day.getDay() > 0) && (time == "08:00" || time == "14:00") ) {
				PushBullet.push("note", "ujBYW0ehUdgsjzX6H2Gtga", null, {title: "Got it", body: "Yes"});
				valids[i].onclick();
				doNextOperate();
				setTimeout( fillForm, 1000 );
				break;
			} else {
				setTimeout( function() {
					window.dispatchEvent(window.customEvent);
				} , (window.weekToCheck == 0) ? checkInterval : 500 );
			}
		}
	}
}

function fillForm() {
	var useNature = $("#UseNature + span input")
	useNature[0].value = "科研"
	useNature[1].value = 0
	var content = document.getElementById("ExperimentationContent")
	content.value = "C"

	doNextOperate()
	setTimeout( agreeRule, 1000 )
}

function agreeRule() {
	$("#HasReadTheNotice")[0].checked = true
	setTimeout( doNextOperate, 500 )
}

window.dispatchEvent(window.customEvent);