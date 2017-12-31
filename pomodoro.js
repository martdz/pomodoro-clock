$(document).ready(function(){
	var session_length = $("#session").text();
	var sec = 60;
	var min = session_length;
	var min_pressed;
	var timer_sec;
	
	$("#refresh").click(function(){
		location.reload();
	});

	$(".minus_s").click(function(){
		if(session_length > 1){
			session_length = session_length - 1;
			$("#session").html(session_length);	
		}
	});
	$(".plus_s").click(function(){
		if(session_length < 60){
			session_length = parseInt(session_length) + 1;
			console.log("session length from plus " + session_length);
			$("#session").html(session_length);
		}
	});
	$("#timer").click(function(){
		if($("#timer").hasClass("pressed")){
			min = $(".min").html();
			min_pressed = min;
			console.log("min" + min);
			sec = $(".sec").html();
			console.log("sec" + sec);
			myStopFunction(timer_sec);
			$(".min").html(min);
			$(".sec").html(sec);
			$("#timer").removeClass("pressed");
		}else{
			$("#timer").addClass("pressed");
			time();
		}
	});
	function time(){
		console.log("func");
		min = min_pressed || (session_length - 1).toString();
		if((min < 10 && typeof min == "string" && min.indexOf("0") == -1) || min.length == 1 && min[0] == "0"){
			min = "0" + min;
		}
		setTimeout(function() {$(".min").html(min);}, 1000);
		timer_sec = setInterval(function(){
			console.log("timer_sec func");
			if(sec > 0){
				if(sec > 10){
					sec = sec - 1;
				}else{
					sec = "0" + (sec - 1);
				}
				$(".sec").html(sec);
				$(".min").html(min);
				console.log("sec" + sec);
				if(sec == 0 && min > 0){
					if(min > 10){
						min = min - 1;
					}else{
						min = "0" + (min - 1);
					}
					sec = 60;
				}
			}else{
				if(min == "0" || min == 0 || min == "00"){
					var audio = document.getElementById('sound');
					audio.play();
					HTMLAudioElement.prototype.stop = function(){
						this.pause();
						this.currentTime = 0.0;
					}
					setTimeout(function() {audio.stop();}, 1000);
					setTimeout(function() {myStopFunction(timer_sec);}, 2000);
					myStopFunction(timer_sec);
					$("#timer").removeClass("pressed");
					console.log("min" + min);
					console.log("sec" + sec);
					console.log("session_length" + session_length);
					min_pressed = null;
					min = session_length;
					sec = 60;
				}
			}
		}, 1000);
	}
	function myStopFunction(clear) {
		clearInterval(clear);
	}
		
});