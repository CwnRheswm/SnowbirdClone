	var $ = function(selector) {
		return document.querySelectorAll(selector);
	};

	(function(){
		var weatherBtn = $('.weatherWidgetBtn')[0],
		navBtn = $('.navWidgetBtn')[0],
		bar = $('#headerBar')[0],
		header = $("#headerWrapper")[0],
		navIcon = $(".navIcon")[0],
		isDrawerOpen,
		isInWeatherState,
		isInNavState,
		delay=2000,
		minorDelay=10;

		drawer = (function(){
			var _ele = $('.drawer')[0],
			_wrap = $('.drawerWrapper')[0],
			minorDelay=10;
			_open = function(state){
				_ele.classList.add(state);
				_ele.classList.add('closed');
				setTimeout(function(){
					_ele.classList.remove('closed');
					_wrap.classList.add('opened');
					_ele.classList.add('opened');
				},minorDelay);
			},
			_close = function(){
				_wrap.classList.remove('opened');
				_ele.classList.remove('opened');
				setTimeout(function(){
					//_ele.classList.toggle('weather',false);
					//_ele.classList.toggle('nav',false);
				},delay);
			},
			_setState = function(state, stateOnOff){
				if(stateOnOff == true){
					return _ele.classList.add(state);
				}
				else if(stateOnOff == false){
					return _ele.classList.remove(state);
				}
				else {
					return
				}
			},
			_toggleState = function(state){
				_ele.classList.toggle(state);
				if(arguments.length === 2){
					_ele.classList.toggle(state, arguments[1]);
				}
			},
			_state = function(stateCheck){
				return _ele.classList.contains(stateCheck);
			}

			return {open:_open, 
				close:_close, 
				setState:_setState,
				toggleState:_toggleState,
				state: _state};
		}());

		

		weatherBtn.addEventListener('click', function(){
			
			isDrawerOpen = drawer.state('opened'),
			isInWeatherState = drawer.state('weather'),
			isInNavState = drawer.state('nav'); 

			!isDrawerOpen ? drawer.open('weather') & drawer.toggleState('nav',false) & weatherBtn.classList.add('active') & console.log("Drawer is closed, open and set weather"):
							isInNavState ? drawer.toggleState('nav') & navIcon.classList.remove('active') & weatherBtn.classList.add('active') & drawer.toggleState('weather') : 
							drawer.close() & weatherBtn.classList.toggle('active',false);
		});

		navBtn.addEventListener('click', function(){
			isDrawerOpen = drawer.state('opened'),
			isInWeatherState = drawer.state('weather'),
			isInNavState = drawer.state('nav');
			
			!isDrawerOpen ? drawer.open('nav') & drawer.toggleState('weather',false) & navIcon.classList.add('active') :  //closed Drawer, opening Drawer from top, displaying Nav and switching the navIcon
							isInWeatherState ? drawer.toggleState('weather') & weatherBtn.classList.remove('active') & navIcon.classList.add('active') & drawer.toggleState('nav') : //opened Drawer w/ Weather, take '.weather' off, add '.nav' and switch navIcon
							//removed drawer.setState('weather',false)
							drawer.close() & navIcon.classList.toggle('active',false); // opened Drawer w/ Nav, close everything.
			
		});

		}());