var hei = 200;
var session = 1500;
var breakSession = 300;
var timer = [0,25,0];
var heightDown = (300/session);
var inSession = true;
var running = false;
var start;

$(".time").html("25");

// Play and pause
$( ".cover" ).click(function() {
  if (running) {
  	clearInterval(start);
  	running = false;
  }else {
  	start = setInterval(function(){update();}, 1000);
  	running = true;
  }
});

// Decrements break time
$( ".break-minus" ).click(function() {
  if (!running && inSession) {
  	if (breakSession > 60) {
  		breakSession -= 60;
  		$(".break-number").html(breakSession/60);
  	}	
  }
});

// Increments break time
$( ".break-plus" ).click(function() {
  if (!running && inSession) {
  	breakSession += 60;
  	$(".break-number").html(breakSession/60);	
  }
});


// Decrements Pomodoro time
$( ".session-minus" ).click(function() {
  if (!running && inSession) {
  	if (session > 60) {
  		session -= 60;
	  	$(".session-number").html(session/60);	
	  	$(".time").html(session/60);

	  	timer[0] = Math.trunc(session/3600);
		timer[1] = Math.trunc((session%3600)/60);
		timer[2] = (session%60);
		hei = 200;
		heightDown = (200/session);
  	}
  }
});

// Increments Pomodoro time
$( ".session-plus" ).click(function() {
  if (!running && inSession) {
  	session += 60;
  	$(".session-number").html(session/60);
  	$(".time").html(session/60);	

  	timer[0] = Math.trunc(session/3600);
	timer[1] = Math.trunc((session%3600)/60);
	timer[2] = (session%60);
	hei = 200;
	heightDown = (200/session);
  }
});

// Updates all
function update() { 
 	if (hei >= heightDown) {
 		hei -= heightDown;
 	}else{
 		hei = 200;
 		if (inSession) {
 			heightDown = (200/breakSession);
 			inSession = false;

 			timer[0] = Math.trunc(breakSession/3600);
 			timer[1] = Math.trunc((breakSession%3600)/60);
 			timer[2] = (breakSession%60);

 			$(".back-back").css('background-color', '#FF6501');
 			$(".legend").html("Break!");
 		}else {
 			heightDown = (200/session);
 			inSession = true;

 			timer[0] = Math.trunc(session/3600);
 			timer[1] = Math.trunc((session%3600)/60);
 			timer[2] = (session%60);
 			$(".back-back").css('background-color', '#8EBC05');
 			$(".legend").html("Session");
 		} 
 	} 
 	if(timer[2] > 0) {
       timer[2] -= 1;
    }else {
      if(timer[1] > 0) {
         timer[2] = 59;
         timer[1] -= 1;
      }else {
        if(timer[0] > 0) {
	        timer[1] = 59;
	        timer[2] = 59;
	        timer[0] -= 1;
	      }
      }
    }

    $(".back-back").css('height', hei+'px'); 
 	updateTimer();
 }

 function updateTimer() {
 	if ((timer[0] > 0) && (timer[1] > 0) && (timer[2] > 0)) {
 		$(".time").html(timer[0]+":"+timer[1]+":"+timer[2]);
 	}else if ((timer[0] == 0) && (timer[1] > 0) && (timer[2] > 0)) {
 		$(".time").html(timer[1]+":"+timer[2]);
 	}else if ((timer[0] == 0) && (timer[1] == 0) && (timer[2] > 0)) {
 		$(".time").html(timer[2]);
 	}
 } 