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
	minorDelay=10,
	weatherKey='2a875b5c2a61bdb14dc7f2af6876cf7b'; //this would not be hardcoded afaik

	//weatherData = (function(){
	//	var twentyFour = $('.leftCol ul li:nth-child(1) > span:nth-child(1)'),
	//	;
	//});
	setCookie = function (c_name,value,expireminutes){
		var exdate = new Date();
		exdate.setMinutes(exdate.getMinutes()+expireminutes);
		document.cookie = c_name+"="+escape(value)+((expireminutes==null) ? "" : ";expires="+exdate.toUTCString());
	};
	getCookie = function(c_name){
		if (document.cookie.length > 0){ //if cookies exists
			c_start=document.cookie.indexOf(c_name+"="); //look for specified cookie
			if (c_start!=-1){ //if that start is actually there
				c_start=c_start + c_name.length+1; //ammend start to start at the beginning of given cookie
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1){
					c_end=document.cookie.length; //if c_end is at the end of the cookie
					return unescape(document.cookie.substring(c_start,c_end));
				}
			}
		}
		return "";
	};
	function getJSONP(url, success){
		var ud = '_'+ +new Date,
			script = document.createElement('script'),
			head = document.getElementsByTagName('head')[0]
					|| document.documentElement;
		
		window[ud] = function(data){
			head.removeChild(script);
			success && success(data);
		};

		script.src = url.replace('callback=?', 'callback='+ud);
		
		head.appendChild(script);
	}
	drawer = (function(){
		var _ele = $('.drawer')[0],
		_wrap = $('.drawerWrapper')[0],
		_plot = $('#Plot')[0],
		minorDelay=10,
		isWeatherWritten=false;
		_open = function(state){
			_ele.classList.add(state);
			_ele.classList.add('closed');
			setTimeout(function(){
				_ele.classList.remove('closed');
				_wrap.classList.add('opened');
				_ele.classList.add('opened');
				_plot.classList.add('opened');
			},minorDelay);
			if(!isWeatherWritten){
				console.log(Math.round(snowbirdWeather.today.main.temp));
				$(".curr")[0].innerHTML = Math.round(snowbirdWeather.today.main.temp)+"<span><sup>&deg</sup></span>";
				var rightColList = $(".rightCol ul")[0];
				console.log(rightColList.children[0].children[2].innerHTML);
				console.log(snowbirdWeather.fiveDay.list);	
				
				for(var i = 0; i < rightColList.children.length; i++){
					rightColList.children[i].children[2].innerHTML = Math.round(snowbirdWeather.fiveDay.list[i].temp.max)+'&deg'
					rightColList.children[i].children[3].innerHTML = Math.round(snowbirdWeather.fiveDay.list[i].temp.min)+'&deg'
					if(snowbirdWeather.fiveDay.list[i].weather[0].main == "Clouds"){rightColList.children[i].children[1].style.backgroundImage = "url('Images/clear_blue.png')"};console.log(rightColList.children[i].children[1].style.backgroundImage);
				}
			};
		},
		_close = function(){
			_wrap.classList.remove('opened');
			_ele.classList.remove('opened');
			_plot.classList.remove('opened');
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
	snowbirdWeather = {
		"fiveDay":"",
		"today":""
	};
	cookie = getCookie('Snowbird,UT');
	cookie===""
		? 	getJSONP('http://api.openweathermap.org/data/2.5/weather?q=snowbird,ut&cnt=5&mode=json&units=metric&callback=?', function(data){
							snowbirdWeather.today = data;
							console.log(snowbirdWeather.today);
							getJSONP('http://api.openweathermap.org/data/2.5/forecast/daily?q=snowbird,ut&cnt=5&mode=json&units=metric&callback=?&APPID='+weatherKey, function(data){
								snowbirdWeather.fiveDay = data;	
								console.log(snowbirdWeather.fiveDay);
								setCookie("Snowbird,UT",JSON.stringify(snowbirdWeather),720);
								console.log("Empty Cookie, Generating Weather Data");
							});
						})
		: snowbirdWeather = JSON.parse(cookie);
}());