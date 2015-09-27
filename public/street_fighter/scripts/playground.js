(function(){

    //create the first character
    window.addEventListener('load', function(){

	function PlayGround(selector_ch1){
	    var bruceLee  = new Bruce(selector_ch1);
	    
	    //attaches event listener to the document listening for key strokes
	    this.initialize = function(){
		$(document).keydown(function(e) {
		    //if the user pressed 'D'
		    console.log(e.keyCode);
		    if(e.keyCode == 39) {
			bruceLee.updateAction("WALK_RIGHT");
		    }
		    else if(e.keyCode == 37) {
			bruceLee.updateAction("WALK_LEFT");
		    }
		    else if(e.keyCode == 74) {
			bruceLee.updateAction("COMBINATION_PUNCH");
		    }
		    else if(e.keyCode == 65) {
			bruceLee.updateAction("PUNCH");
		    }
		    else if(e.keyCode == 83) {
			bruceLee.updateAction("KICK");
		    }
		    else if(e.keyCode == 68) {
			bruceLee.updateAction("SHOW_OFF");
		    }
		    else if(e.keyCode == 70) {
			bruceLee.updateAction("ROUND_KICK");
		    }
		    else if(e.keyCode == 76) {
			bruceLee.updateAction("FLY_KICK");
		    }
		});
	    };

	    this.mainLoop = function(){
		bruceLee.drawCharacter();
	    };
	}

	var a = new PlayGround('bruce');	//create a new playGround and pass the id where the first character will be displayed
	a.initialize();
	setInterval(a.mainLoop, 200);
    });

})();

