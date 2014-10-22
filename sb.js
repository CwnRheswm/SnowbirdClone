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
	};

	getIconUrl = function(iconCode){
		var addClass = [];

		switch(iconCode.substr(0,2)){
			case "01":
				addClass.push("clear");
				break;
			case '02':
			case '03':
				addClass.push("partly_cloudy");
				break;
			case '04':
			case '50':
				addClass.push("cloudy");
				break;
			case '09':
			case '10':
			case '11':
				addClass.push("rain");
				break;
			case '13':
				addClass.push("snow");
				break;
			default:
				addClass.push("clear");
				break;
		};
		switch(iconCode.substr(2,1)){
			case "n":
				addClass.push("night");
				break;
			case "d":
			default:
				break;
		}
		return addClass;
		/*
		01 = clear,
		02, 03 = partly_cloudy,
		04, 50 = cloudy,
		09, 10, 11 = rain,
		13 = snow;
		*/
	};

	getWeatherFromCookie = function(cookie, success){
		array = JSON.parse(cookie);
		success(array);
	};
	setWeatherFromCookie = function(weatherArray){
		console.log(weatherArray);
		$(".curr")[0].innerHTML = Math.round(weatherArray.today.main.temp)+"<span><sup>&deg</sup></span>";
		var curWeather = getIconUrl(weatherArray.today.weather[0].icon);
		$(".currentTemp .icon")[0].classList.add(curWeather);
		//console.log($(".currentTemp .icon")[0]);
		var rightColList = $(".rightCol ul")[0];
		//console.log(rightColList.children[0].children[2].innerHTML);
		//console.log(snowbirdWeather.fiveDay.list);
		
		for(var i = 0; i < rightColList.children.length; i++){
			var d = new Date();
			var day=d.getDay();
			var weekday = new Array(7);
			weekday[0] = "sun";
			weekday[1] = "mon";
			weekday[2] = "tue";
			weekday[3] = "wed";
			weekday[4] = "thu";
			weekday[5] = "fri";
			weekday[6] = "sat";
			
			day = day+i;
			if(day > 6){day-=7};

			rightColList.children[i].children[0].innerHTML = weekday[day];
			var addClass = getIconUrl(weatherArray.fiveDay.list[i].weather[0].icon);
			for (var cls of addClass){
				rightColList.children[i].children[1].classList.add(cls);
			};
			rightColList.children[i].children[2].innerHTML = Math.round(weatherArray.fiveDay.list[i].temp.max)+'&deg'
			rightColList.children[i].children[3].innerHTML = Math.round(weatherArray.fiveDay.list[i].temp.min)+'&deg'
			//if(snowbirdWeather.fiveDay.list[i].weather[0].main == "Clouds"){rightColList.children[i].children[1].style.backgroundImage = "url('Images/clear_blue.png')"};console.log(rightColList.children[i].children[1].style.backgroundImage);
		};
		$(".weatherWidgetBtn")[0].classList.add(curWeather);
	};

	getPrecip = function(precip){
		if (precip){
			//
		}
	};

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
				/*
				//console.log(Math.round(snowbirdWeather.today.main.temp));
				$(".curr")[0].innerHTML = Math.round(snowbirdWeather.today.main.temp)+"<span><sup>&deg</sup></span>";
				$(".currentTemp .icon")[0].classList.add(getIconUrl(snowbirdWeather.today.weather[0].icon));
				//console.log($(".currentTemp .icon")[0]);
				var rightColList = $(".rightCol ul")[0];
				//console.log(rightColList.children[0].children[2].innerHTML);
				//console.log(snowbirdWeather.fiveDay.list);
				
				for(var i = 0; i < rightColList.children.length; i++){
					var d = new Date();
					var day=d.getDay();
					var weekday = new Array(7);
					weekday[0] = "sun";
					weekday[1] = "mon";
					weekday[2] = "tue";
					weekday[3] = "wed";
					weekday[4] = "thu";
					weekday[5] = "fri";
					weekday[6] = "sat";
					
					day = day+i;
					if(day > 6){day-=7};

					rightColList.children[i].children[0].innerHTML = weekday[day];
					var addClass = getIconUrl(snowbirdWeather.fiveDay.list[i].weather[0].icon);
					for (var cls of addClass){
						rightColList.children[i].children[1].classList.add(cls);
					};
					rightColList.children[i].children[2].innerHTML = Math.round(snowbirdWeather.fiveDay.list[i].temp.max)+'&deg'
					rightColList.children[i].children[3].innerHTML = Math.round(snowbirdWeather.fiveDay.list[i].temp.min)+'&deg'
					//if(snowbirdWeather.fiveDay.list[i].weather[0].main == "Clouds"){rightColList.children[i].children[1].style.backgroundImage = "url('Images/clear_blue.png')"};console.log(rightColList.children[i].children[1].style.backgroundImage);
				};

				isWeatherWritten = true;
			*/
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
							//console.log(snowbirdWeather.today);
							getJSONP('http://api.openweathermap.org/data/2.5/forecast/daily?q=snowbird,ut&cnt=5&mode=json&units=metric&callback=?&APPID='+weatherKey, function(data){
								snowbirdWeather.fiveDay = data;	
								//console.log(snowbirdWeather.fiveDay);
								setCookie("Snowbird,UT",JSON.stringify(snowbirdWeather),720);
								//console.log("Empty Cookie, Generating Weather Data");
							});
						})
		: snowbirdWeather = getWeatherFromCookie(cookie, function(){
			setWeatherFromCookie(array);
		}) //(snowbirdWeather = JSON.parse(cookie), console.log(snowbirdWeather.today.weather.description));
}());
/*
current({"coord":{"lon":-0.13,
				  "lat":51.51},
		 "sys":{"type":1,
		 		"id":5091,
		 		"message":0.0291,
		 		"country":"GB",
		 		"sunrise":1413873338,
		 		"sunset":1413910469},
		  "weather":[{"id":802,
		  			  "main":"Clouds",
		  			  "description":"scattered clouds",
		  			  "icon":"03n"}],
		  "base":"cmc stations",
		  "main":{"temp":281.57,
		  		  "pressure":1018,
		  		  "humidity":61,
		  		  "temp_min":280.15,
		  		  "temp_max":283.15},
		  "wind":{"speed":10.3,
		  		  "deg":290,
		  		  "gust":15.4},
		  "clouds":{"all":48},
		  "dt":1413928073,
		  "id":2643743,
		  "name":"London",
		  "cod":200});
*/