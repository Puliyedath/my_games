(function(){
    var constants = {
	'STANDING': 	{ 'y': 10, 'x': [12, 85, 154, 218, 290,364], 'width': [60,60,60,60,60,60]},
	'WALK_RIGHT': 	{ 'y': 10, 'x': [12, 85], 'width': [60,60]},
	'WALK_LEFT': 	{ 'y': 10, 'x': [12, 85], 'width': [60,60]},
	'PUNCH':  	{ 'y': 450, 'x': [16, 81, 143], 'width': [68,68,68]},
	'KICK': 	{ 'y': 240, 'x': [14, 110, 218], 'width':[93,93,93] },
	'ROUND_KICK': 	{ 'y': 230, 'x': [593,461], 'width': [97,97]},
	'FLY_KICK': 	{ 'y': 346, 'x': [24,72,130,193,290], 'width': [54,54,54,58,99]},
	'SHOW_OFF': 	{ 'y': 130, 'x': [469, 469, 469], 'width': [65,65,65]},
	'COMBINATION_PUNCH': 	{ 'y': 125, 'x': [22, 275, 157,219,88, 339,401], 'width': [65,65,65,58,67,67,67]}
    };

    window.addEventListener('load', function (){

	var Bruce = function(selector){
	    this.selector = selector;
	    this.counter = 0;		//stores which sprite (in the x-direction) it should display 
	    this.action = "STANDING";	//default action is for the character to stand
	    this.ch_x=0;					
	    this.ch_y=0;
	};

	window.Bruce = Bruce;
	
	Bruce.prototype.drawSprite = function(y, x,width){
	    //this takes care of the repeated key pressed when bruce in the middle of his moves
	    if(this.action  !== "FLY_KICK"){
		this.ch_y = 120 ;
	    }
	    
	    $('#'+this.selector).css('background', "url('images/bruce_temp.png') "+ x* (-1) +"px "+ y* (-1) +"px").css('left', this.ch_x+"px").css('top', this.ch_y+"px");
	    $('#'+this.selector).width(width);
	};

	//updates the action
	Bruce.prototype.updateAction = function(action){
	    if(this.action != 'STANDING'){
		return;
	    }
	    if(this.ch_x >= 530 &&  action !="WALK_LEFT"){
		return;
	    }
	    this.counter=0;
	    this.action = action;
	};

	//updates the character's coordinates and changes the sprite's this.counter to simulate the character moving
	Bruce.prototype.updateCoordinate = function(){
	    if(this.counter>=constants[this.action].x.length){
		this.counter=0;
		//if action is anything other than 'STANDING' change the action back to 'STANDING'
		this.action = 'STANDING';
	    }

	    if(this.action == 'WALK_LEFT'){
		if(this.ch_x >= 5){
		    this.ch_x = this.ch_x-5;
		}
	    }
	    else if(this.action == 'WALK_RIGHT'){
		if(this.ch_x <= 550){
		    this.ch_x = this.ch_x+5;
		}
	    }
	    else if(this.action == 'FLY_KICK'){
		if(this.ch_x <= 550){
		    this.ch_y = this.ch_y-6;
		    this.ch_x = this.ch_x+10;
		}
	    }
	};

	//draws the character on the screen
	Bruce.prototype.drawCharacter = function(){
	    this.updateCoordinate();
	    this.drawSprite(constants[this.action].y, constants[this.action].x[this.counter++],constants[this.action].width[this.counter]);

	};

    });
    
})();
