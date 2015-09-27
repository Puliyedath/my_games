function PlayGround(selector_ch1){
    //create the first character
    var ch1 = new Character(selector_ch1);
    
    //attaches event listener to the document listening for key strokes
    this.initialize = function()
    {
	$(document).keydown(function(e) {
	    //if the user pressed 'D'
            console.log(e.keyCode);
	    if(e.keyCode == 39) {
		ch1.updateAction("WALK_RIGHT");
	    }
	    else if(e.keyCode == 37) {
		ch1.updateAction("WALK_LEFT");
	    }
	    else if(e.keyCode == 74) {
		ch1.updateAction("COMBINATION_PUNCH");
	    }
	    else if(e.keyCode == 65) {
		ch1.updateAction("PUNCH");
	    }
	    else if(e.keyCode == 83) {
		ch1.updateAction("KICK");
	    }
	    else if(e.keyCode == 68) {
		ch1.updateAction("SHOW_OFF");
	    }
	    else if(e.keyCode == 70) {
		ch1.updateAction("ROUND_KICK");
	    }
	    else if(e.keyCode == 76) {
		ch1.updateAction("FLY_KICK");
            }
	});
    };

    this.mainLoop = function(){
	ch1.drawCharacter();
    };


}	//end of PlayGround class

function Character(selector)
{
    var selector = selector; //store the html id of the character

    var constants = {
	'STANDING': 	{ 'y': 10, 'x': [12, 85, 154, 218, 290,364], 'width': [60,60,60,60,60,60]},
	'PUNCH':  		{ 'y': 450, 'x': [16, 81, 143], 'width': [68,68,68]},
	'KICK': 		{ 'y': 240, 'x': [14, 110, 218], 'width':[93,93,93] },
	'ROUND_KICK': 	{ 'y': 230, 'x': [593,461], 'width': [97,97]},
	'FLY_KICK': 	{ 'y': 346, 'x': [24,72,130,193,290], 'width': [54,54,54,58,99]},
	'SHOW_OFF': 	{ 'y': 130, 'x': [469, 469, 469], 'width': [65,65,65]},
	'COMBINATION_PUNCH': 	{ 'y': 125, 'x': [22, 275, 157,219,88, 339,401], 'width': [65,65,65,58,67,67,67]}
    };

    var counter = 0;			//stores which sprite (in the x-direction) it should display 
    this.action = "STANDING";	//default action is for the character to stand
    this.ch_x=0;					//x_coordinate of the character
    this.ch_y=0;					//y_coordinate of the character
    //ch_x, ch_y and action could really all be private variables and I could have just done var instead of this. but to make debuggin easier, I am making them an instance variable so that it would display when you log the chracter object

    this.drawSprite = function(y, x,width){
        if(this.action  !== "FLY_KICK"){
            this.ch_y = 120 ;
        }
	$('#'+selector).css('background', "url('images/bruce_temp.png') "+ x* (-1) +"px "+ y* (-1) +"px").css('left', this.ch_x+"px").css('top', this.ch_y+"px");
        $('#'+selector).width(width);
    };

    //updates the action
    this.updateAction = function(action){
	counter=0;
	this.action = action;
    };
    //updates the character's coordinates and changes the sprite's counter to simulate the character moving
    this.updateCoordinate = function(){
	if(counter>=constants[this.action].x.length)
	{
	    counter=0;
	    //if action is anything other than 'STANDING' change the action back to 'STANDING'
	    this.action = 'STANDING';
	}

	if(this.action == 'WALK_LEFT'){
	    this.ch_x = this.ch_x-5;
        }
	else if(this.action == 'WALK_RIGHT'){
	    this.ch_x = this.ch_x+5;
        }
	else if(this.action == 'FLY_KICK'){
	    this.ch_y = this.ch_y-8;
	    this.ch_x = this.ch_x+15;
        }
    };

    //draws the character on the screen
    this.drawCharacter = function(){
	// console.log("drawing character");
	this.updateCoordinate();
	this.drawSprite(constants[this.action].y, constants[this.action].x[counter++],constants[this.action].width[counter]);
	//this.drawSprite(constants[this.action].y, constants[this.action].x[counter++]);
    };
}
