var $ = function(selector){
	return document.querySelectorAll(selector);
};

(function(){
	var _drawer = this.$('.drawer'),
		_cube = $('html /deep/ .cubeContent')[0],
		_block = $('html /deep/ #headerBlock')[0],
		minorDelay = 10,
		isWeatherWritten = false,
		weatherBtn = this.$('.weatherWidgetBtn'),
		navBtn = $('html /deep/ .navWidgetBtn')[0];

	drawer = (function(){
		_open = function(state){
			_cube.classList.add(state);
			_cube.classList.add('closed');
			setTimeout(function(){
				_cube.classList.remove('closed');
				_cube.classList.add('opened');
				_drawer.classList.add('opened');
				_block.classList.add('opened');
			},minorDelay)
		},
		_close = function(){
			_cube.classList.remove('opened');
			_drawer.classList.remove('opened');
			_block.classList.remove('opened');
			setTimeout(function(){

			},delay);
		},
		_setState = function(state, stateOnOff){
			if(stateOnOff === true){
				return _cube.classList.add(state);
			}
			else if(stateOnOff === false){
				return _cube.classList.remove(state);
			}
			else {
				return;
			}
		},
		_toggleState = function(state){
			_cube.classList.toggle(state);
			if(arguments.length === 2){
				_cube.classList.toggle(state, arguments[1]);
			}
		},
		_state = function(stateCheck){
			return _cube.classList.contains(stateCheck);
		};

		return {open: _open,
			close: _close,
			setState: _setState,
			toggleState: _toggleState,
			state: _state};
	}());
	console.log(weatherBtn);
	weatherBtn.addEventListener('click', function(){
		isDrawerOpen = drawer.state('opened'),
        isInWeatherState = drawer.state('weather'),
        isInNavState = drawer.state('nav'),

        !isDrawerOpen ?
            drawer.open('weather')
                & drawer.toggleState('nav',false) 
                & weatherBtn.classList.add('active') 
                & console.log("Drawer is closed, open and set weather")
            : isInNavState ? drawer.toggleState('nav')
                & navIcon.classList.remove('active')
                & weatherBtn.classList.add('active')
                & drawer.toggleState('weather')
                    : drawer.close() & 
                    weatherBtn.classList.toggle('active',false);
    });

    navBtn.addEventListener('click', function(){
        isDrawerOpen = drawer.state('opened'),
        isInWeatherState = drawer.state('weather'),
        isInNavState = drawer.state('nav'),
        
        !isDrawerOpen ? 
            drawer.open('nav') 
                & drawer.toggleState('weather',false) 
                & navIcon.classList.add('active') //closed Drawer, opening Drawer from top, displaying Nav and switching the navIcon
            : isInWeatherState ? 
                drawer.toggleState('weather') 
                    & weatherBtn.classList.remove('active') 
                    & navIcon.classList.add('active') 
                    & drawer.toggleState('nav') //opened Drawer w/ Weather, take '.weather' off, add '.nav' and switch navIcon
                : drawer.close() & navIcon.classList.toggle('active',false); // opened Drawer w/ Nav, close everything.
    });

	return{drawer: drawer};
}());