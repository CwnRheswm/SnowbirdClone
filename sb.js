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
					_ele.classList.toggle('weather',false);
					_ele.classList.toggle('nav',false);
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

			!isDrawerOpen ? drawer.open('weather') & weatherBtn.classList.add('active') :
							isInNavState ? drawer.toggleState('nav') & navIcon.classList.remove('active') & weatherBtn.classList.add('active') & drawer.toggleState('weather') : 
							drawer.close() & weatherBtn.classList.toggle('active',false);
			/*
			if(!isDrawerOpen){drawer.setState('right') & drawer.open()}
				else{drawer.close()}
			drawer.toggleState('weather');
			drawer.toggleState('nav',false);
			


			!isDrawerOpen ? drawer.toggle('right') & drawer.open() & drawer.sets('weather',true) & weatherBtn.classList.add('active'): 
							isInNavState ? drawer.toggleState('nav') & navIcon.classList.remove('active') & drawer.setState('weather',true) & weatherBtn.classList.add('active') : 
							drawer.close() & 
							  setTimeout(function(){
							  	drawer.setState('weather',false);
							  	weatherBtn.classList.remove('active');
							  },delay);	*/
		});

		navBtn.addEventListener('click', function(){
			isDrawerOpen = drawer.state('opened'),
			isInWeatherState = drawer.state('weather'),
			isInNavState = drawer.state('nav');
			
			!isDrawerOpen ? drawer.open('nav') & navIcon.classList.add('active') :  //closed Drawer, opening Drawer from top, displaying Nav and switching the navIcon
							isInWeatherState ? drawer.toggleState('weather') & weatherBtn.classList.remove('active') & navIcon.classList.add('active') & drawer.toggleState('nav') : //opened Drawer w/ Weather, take '.weather' off, add '.nav' and switch navIcon
							//removed drawer.setState('weather',false)
							drawer.close() & navIcon.classList.toggle('active',false); // opened Drawer w/ Nav, close everything.
			
		});

		}());

			/*
			if(!isInNavState && !isInWeatherState){
				drawer.setState('opened',false);
			}
			
			if (!isDrawerOpen){
				drawer.setState('opened',true);
			};

			if(isInNavState){
				drawer.setState('nav',false);
			};
			
			if(!isDrawerOpen) {
				drawer.clasList.add('opened');
				drawer.classList.add('weather');
			}
			else if (isDrawerOpen && isInWeatherState){
				drawer.clasList.remove('opened');
			}
			else {
				drawer.classList.add('weather');
			}*/
		
		/*
			if(wO.classList.contains("weatherWBtn")){
				widget.addClass('opened');
				if(navWrapper.attr("class") !== "navWBtn"){
					nav.removeClass("opened");
					navBtn.removeClass("opened");
					navClick.css("transform","rotateZ(0)");
				}
				
				wO.addClass("opened");
			} else{
				//header.css("top","0");
				//widgetWrapper.css("transform","perspective(100px) rotateX(60deg)");
				widget.removeClass("opened")
				wO.removeClass("opened");
			};
		});

		navBtn.click(function(){
			if(navBtn.attr("class") === "navWBtn"){
				//header.css("top","0");
				//navWrapper.css("transform","perspective(0) rotateX(0deg)");
				navWrapper.css("height","20rem");
				widgetWrapper.css("height","0")
				navBtn.addClass("opened");
				navClick.css("transform","rotateZ(45deg)");
				if(wO.attr("class") !== "weatherWBtn"){
					widgetWrapper.css("height","0");
					wO.removeClass("opened");
				}
			} else {
				//header.css("top","0");
				//navWrapper.css("transform","perspective(100px) rotateX(60deg)");
				navWrapper.css("height","0");
				navBtn.removeClass("opened");
				navClick.css("transform","rotateZ(0deg)");
			};
		});*/
	