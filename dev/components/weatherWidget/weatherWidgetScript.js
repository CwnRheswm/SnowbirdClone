var $ = function(selector) {
	return document.querySelectorAll(selector);
};

(function(){
	var isDebug = window.location.hostname === "localhost",
	today = new Date(),
	storedWeather,
	expTime = 43200000,
	weatherObject = {"forecast":""};

	weather = (function(){
		_buildWeatherJSONfromOWMJSON = function(owmJSON, callback){
			//owmJSON 
			var weekday = ["sun","mon","tue","wed","thu","fri","sat"],
			day = today.getDay(),
			weatherDay = {},
			dayIter;
			for(var weatherIter = 0; weatherIter < Object.keys(owmJSON.forecast).length; weatherIter++){
				dayIter = weatherIter + day;
				if(dayIter > 6){
					dayIter -= 7;
				}
				weatherDay[weatherIter] = {"day":weekday[dayIter],
				"icon":_parseOWMIconCode(owmJSON.forecast[weatherIter].weather[0].icon),
				"high": Math.round(owmJSON.forecast[weatherIter].main.temp_max),
				"low": Math.round(owmJSON.forecast[weatherIter].main.temp_min),
				"temp":Math.round( owmJSON.forecast[weatherIter].main.temp)};
			};
			weatherDay.dateSet = new Date();
			console.log(weatherDay.dateSet.toJSON());
			callback(weatherDay); //pass back the filled out weatherDay JSON
		},
		_getWeatherFromOWM = function(success){ //returns an JSON of weather
			//retrieves a weather inquiry from OWM and stores it in localStorage
			if(isDebug){
				var item= { "coord":{"lon":-0.13,"lat":51.51},
	                    /*"current":{"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],
	                    "main":{"temp":5,"pressure":1018,"humidity":61,"temp_min":14,"temp_max":1},
	                    "wind":{"speed":10.3,"deg":290,"gust":15.4}},*/
	                    "forecast":{"0":{"weather":[{"id":800, //weather.id
	                        "main":"Clear", //weather.main
	                        "description":"sky is clear", //weather.description
	                        "icon":"10n"}], //weather.icon
	                        "main":{"temp":12.73, //temp.day
	                            "pressure":814.36, //pressure
	                            "humidity":61, //humidity
	                            "temp_min":0, //temp.min
	                            "temp_max":15.22}, //temp.max
	                        "wind":{"speed":10.3, //speed
	                            "deg":290,  //deg
	                            "gust":15.4},
	                        },
	                        "1":{"weather":[{"id":500, //weather.id
	                        "main":"Rain", //weather.main
	                        "description":"light rain", //weather.description
	                        "icon":"10n"}], //weather.icon
	                        "main":{"temp":12.73, //temp.day
	                            "pressure":814.36, //pressure
	                            "humidity":61, //humidity
	                            "temp_min":1, //temp.min
	                            "temp_max":11.46}, //temp.max
	                        "wind":{"speed":10.3, //speed
	                            "deg":290,  //deg
	                            "gust":15.4},
	                        },
	                        "2":{"weather":[{"id":800, //weather.id
	                        "main":"Clear", //weather.main
	                        "description":"sky is clear", //weather.description
	                        "icon":"01n"}], //weather.icon
	                        "main":{"temp":12.73, //temp.day
	                            "pressure":814.36, //pressure
	                            "humidity":61, //humidity
	                            "temp_min":4.11, //temp.min
	                            "temp_max":14.78}, //temp.max
	                        "wind":{"speed":10.3, //speed
	                            "deg":290,  //deg
	                            "gust":15.4},
	                        },
	                        "3":{"weather":[{"id":500, //weather.id
	                        "main":"Rain", //weather.main
	                        "description":"light rain", //weather.description
	                        "icon":"10n"}], //weather.icon
	                        "main":{"temp":14.64, //temp.day
	                            "pressure":814.36, //pressure
	                            "humidity":61, //humidity
	                            "temp_min":4.11, //temp.min
	                            "temp_max":14.64}, //temp.max
	                        "wind":{"speed":10.3, //speed
	                            "deg":290,  //deg
	                            "gust":15.4},
	                        },
	                        "4":{"weather":[{"id":802, //weather.id
	                        "main":"Rain", //weather.main
	                        "description":"light rain", //weather.description
	                        "icon":"10n"}], //weather.icon
	                        "main":{"temp":9, //temp.day
	                            "pressure":814.36, //pressure
	                            "humidity":61, //humidity
	                            "temp_min":2, //temp.min
	                            "temp_max":9}, //temp.max
	                        "wind":{"speed":10.3, //speed
	                            "deg":290,  //deg
	                            "gust":15.4},
	                        }
	                    },
	                    "name":"London",
	                    "dateSet":new Date()
	                };
				_buildWeatherJSONfromOWMJSON(item, function(data){
					success(data);
				})
			}
			else{
				//url parts
	            var owmJSON = {
	                "forecast":""
	            },
	            units = arguments.units || "metric",
	            city = arguments.city || "snowbird, UT",
	            forecastDays = arguments.forcastDays || "5",
	            weatherKey='2a875b5c2a61bdb14dc7f2af6876cf7b',
	            url = "http://api.openweathermap.org/data/2.5/",
	            //weather = ,
	            args = "?q=" +
	                    city + "&cnt=" +
	                    forcastDays + "&mode=json&units=" +
	                    units + "&callback=?&APPID=" +
	                    weatherKey;
	            //forecast/daily instead of weather

	            callService = function(url, success){
	                var ud = '_'+today,
	                script = document.createElement('script'),
	                head = $('#head')[0] || document.documentElement;
	            
	                window[ud] = function(data){
	                    head.removeChild(script);
	                    success && success(data);
	                };

	                script.src = url.replace('callback=?', 'callback='+ud);
	                
	                head.appendChild(script);
	            };

	            callService((url + "forecast/daily" + args), function(data){
	                owmJSON.forecast = data;
	                _buildWeatherJSONfromOWMJSON(owmJSON, function(data){
	                	success(data);
	                });
	                //return owmJSON;
	            });
			}
		},
		_parseOWMIconCode = function(iconCode){
			//parse iconCode, return class string to add to class
	            var icon = "";
	            
	            switch(iconCode.substr(0,2)){
	                
	                case '02':
	                case '03':
	                    icon+=" partlyCloudy";
	                    break;
	                case '04':
	                case '50':
	                    icon+=" cloudy";
	                    break;
	                case '09':
	                case '10':
	                case '11':
	                    icon+=" rain";
	                    break;
	                case '13':
	                    icon+=" snow";
	                    break;
	                //case "01":
	                default:
	                    icon+=" clear";
	                    break;
	            }
	            switch(iconCode.substr(2,1)){
	                case "n":
	                    icon+=" night";
	                    break;
	                //case "d":
	                default:
	                    break;
	            }
	            return icon; //return string of classes to add to icon class

		},
		_retrieveWeatherFromStorage = function(){
			//returns weather JSON if present;
			//queries OWM, stores JSON, then retrieves if absent
			storedWeather = sessionStorage.weatherObject;
			if(storedWeather !== undefined){
				storedWeather = JSON.parse(storedWeather);
				if(new Date(storedWeather.dateSet).getTime() > (today.getTime() + expTime)){
					_getWeatherFromOWM(arguments, function(success){
						storedWeather = success;
						_storeWeatherInLocal(storedWeather);
					});
				}
				else {
					return storedWeather; //this should be a "built JSON"
				}
			}
			else {
				_getWeatherFromOWM(function(success){
					storedWeather = success;
					_storeWeatherInLocal(storedWeather);
				});
			}
			console.log(storedWeather);
			return storedWeather;
		},
		_storeWeatherInLocal = function(weatherJSON){
			sessionStorage.setItem("weatherObject", JSON.stringify(weatherJSON));
		};

		return{getWeather: _retrieveWeatherFromStorage};
	}());

	return{weather:weather};
}());