(function(){
    window.addEventListener('load', function(event){
	var tag = "circle";

	function initialize(attrs){

	    //creates the SVG element and returns it
	    var makeSVG = function(tag, attrs) {
		var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
		for (var k in attrs){
		    el.setAttribute(k, attrs[k]);
		}
		return el;
	    };

            //create a circle - fill it black;
	    attrs.style = "fill: black";
	    console.log(attrs);
            var circle = makeSVG('circle', attrs);

            document.getElementById('svg').appendChild(circle);
	}

	window.Circle = function(cx, cy, html_id, radiusRatio){
	    this.html_id = html_id;
	    this.info = { cx: cx,  cy: cy };
	    this.radiusRatio = radiusRatio;

	    //private function that generates a random number
	    var randomNumberBetween = function(min, max){
		return Math.random()*(max-min) + min;
	    };

	    //give a random velocity for the circle
            this.info.velocity = {
		x: randomNumberBetween(-3,3),
		y: randomNumberBetween(-3,3)
            };

	    initialize({id: this.html_id, cx:cx, cy: cy, r:radiusRatio * 10});
	};


	Circle.prototype.colliding = function(balls){
            var collidingCircles = [];
            for(var ball in balls){
		if (balls[ball].equals(this)){
                    continue;
		}
		var coordX = balls[ball].info.cx;
		var coordY = balls[ball].info.cy;
		var ylength = balls[ball].info.cy - this.info.cy;
		var xlength = balls[ball].info.cx - this.info.cx;

		var distance = Math.sqrt((ylength * ylength) + (xlength * xlength));

		//shows that the balls collide - distance from x1,y1 and x2, y2 is lesser than diamter
		if (distance <= (10 * this.radiusRatio + (10 * balls[ball].radiusRatio))){
                    collidingCircles.push(balls[ball]);
		}
            }
            if (collidingCircles.length > 0){
		collidingCircles.push(this);
            }
            return collidingCircles;
	};

	Circle.prototype.equals = function(ball){
            if (ball === this){
		return true;
            }
            if ((ball.info.cy === this.info.cy) && (ball.info.cx === this.info.cx) && (this.info.radiusRatio === ball.radiusRatio)){
		return true;
            }

            return false;
	};

	Circle.prototype.update = function(time){
            var el = document.getElementById(this.html_id);
            var svg = document.getElementById('svg');
            var svg_rect = svg.getBoundingClientRect();

	    //see if the circle is going outside the browser. if it is, reverse the velocity
            if( this.info.cx >= (svg_rect.width - 10*this.radiusRatio) || (this.info.cx  - 10*this.radiusRatio < 0) ){
		this.info.velocity.x = this.info.velocity.x * -1;
            }
            if( this.info.cy >= (svg_rect.height - 10*this.radiusRatio) || (this.info.cy - 10*this.radiusRatio < 0)){
		this.info.velocity.y = this.info.velocity.y * -1;
            }


            this.info.cx = this.info.cx + this.info.velocity.x*time;
            this.info.cy = this.info.cy + this.info.velocity.y*time;

            el.setAttribute("cx", this.info.cx);
            el.setAttribute("cy", this.info.cy);
	};

    });
})();

