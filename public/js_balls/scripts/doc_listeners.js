(function(){
    window.onload  = function(){

	var mousedown_time;

	function getTime(){
            var date = new Date();
            return date.getTime();
	}

	document.onmousedown = function(e){
            mousedown_time = getTime();
	    console.log(e);
	};

	document.getElementById('svg').onmouseup = function(e){
	    var rect = this.getBoundingClientRect();
            var time_pressed = getTime() - mousedown_time;
            if(time_pressed > 10000){
		time_pressed = 10000;
            }
	    console.log(e);
	    window.playground.createNewCircle(e.clientX - rect.left,e.clientY - rect.top, Math.ceil(time_pressed/1000));
            console.log('You held your mouse down for', time_pressed, 'miliseconds.');
	};

    };
})();
