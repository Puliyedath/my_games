(function(){
    var multiplier = 10 ;
    window.addEventListener("load" ,function(event){
	console.log('inside playground');
	function PlayGround(){
	    this.counter = 0;  //counts the number of circles created
	    this.circles = []; //array that will hold all the circles created in the app
	    this.svg_rect = function(){
		var el = document.getElementById(this.html_id);
		var svg = document.getElementById('svg');
		var svg_rect = svg.getBoundingClientRect();
		return svg_rect;
	    }();  //this gives the boundary of the svg element

	}

	//a loop that updates the circle's position on the screen
	PlayGround.prototype.loop = function(circles){

            for(var circle in circles){
		var cCircles = circles[circle].colliding(circles);
		if(cCircles.length > 0){
                    console.log(cCircles);
		}
		//pg.resolveCollision(cCircles,circles);
		this.combine(cCircles,circles);
            }
	    
            for(circle in circles){
		circles[circle].update(1);
            }
	};

	PlayGround.prototype.createNewCircle = function(x,y,radiusRatio){
            var new_circle = new Circle(x,y,this.counter++, radiusRatio);
            this.circles.push(new_circle);
	    console.log(this.circles);
	};

	PlayGround.prototype.resolveCollision = function(circlesToBeRemoved,circles){
            for(var i = 0 ; i < circlesToBeRemoved.length; i++){
		for(var j = 0 ; j < circles.length; j++){
                    if (circles[j].equals(circlesToBeRemoved[i])){
			
			//delete the html element
			document.getElementById(circles[j].html_id).remove();
			
			//deletes the circle at index 
			delete circles.splice(j, 1);
			break;
                    }
		}
            }
	};

	PlayGround.prototype.combine = function(circlesToBeCombined,circles){
            var tradiusRation = 0 ;
            for(var i = 0 ; i < circlesToBeCombined.length; i++){
		for(var j = 0 ; j < circles.length; j++){
                    if (circles[j].equals(circlesToBeCombined[i])){
                            //if there is only one left in the circles to be removed update the radious to max 
                            if( i === circlesToBeCombined.length -  1){
				document.getElementById(circles[j].html_id).remove();

				//only combine if the bigger circle does not overshoot the boudary
				if (circles[j].info.cx + (circles[j].radiusRatio + tradiusRation) * 10 >= this.svg_rect.width ||
				    (circles[j].info.cy + 10 * (circles[j].radiusRatio + tradiusRation) >= this.svg_rect.height)){
				    circles[j] = new Circle(circles[j].info.cx,circles[j].info.cy,this.counter++, circles[j].radiusRatio);
				}else{
				    circles[j] = new Circle(circles[j].info.cx,circles[j].info.cy,this.counter++, circles[j].radiusRatio + tradiusRation);
				}
				
				circles[j].update(10);
				return;
                            }

                            //delete the html element
                            document.getElementById(circles[j].html_id).remove();
                            tradiusRation += circles[j].radiusRatio;
                            //deletes the circle at index 
                            delete circles.splice(j, 1);
                            break;
                    }
		}
		
            }

	};


	var playground = new PlayGround();

	//when calling a function from setInterval the this context changes
	setInterval(playground.loop.bind(playground, playground.circles), 15);

	//create one circle when the game starts
	playground.createNewCircle(document.body.clientWidth/2, document.body.clientHeight/2, 1);

	window.playground = playground;
    });

}());
