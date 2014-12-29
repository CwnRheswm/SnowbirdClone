var $ = function(selector) {
    return document.querySelectorAll(selector);
};

$(function(){
    var weatherBtn = $('.weatherWidgetBtn')[0],
    navBtn = $('.navWidgetBtn')[0],
    bar = $('#headerBar')[0],
    header = $("#header")[0],
    drawer = $(".drawer")[0],
    cube = $(".cubeContent")[0],
    navIcon = $(".navIcon")[0],
    rightColList = $(".rightCol ul")[0],
    isDrawerOpen,
    isInWeatherState,
    isInNavState,
    delay=2000,
    minorDelay=10,
    isDebug=window.location.hostname === "localhost",
    today=new Date(),
    weatherConditions,
    expTime = 43200000,
    weatherObject = {"forecast":""};

    onPageLoad = function(){
        weatherConditions = weather.getWeather();
        //console.log(weatherConditions," ",weatherConditions.forecast);
        for (var i = 0; i < 5; i++){
            var dayObj = {},
            docDay,
            docImg,
            docHigh,
            docLow,
            list,
            curIcon,
            weaIcon,
            curTemp;
            //run loop to create and set variables for each day
        
            dayObj = weatherConditions[i];
            //set current Temp
            //console.log(i+": "+dayObj.high);
            
            if(i === 0){
                curIcon = $(".currentTemp .icon")[0],
                weaIcon = $(".weatherWidgetBtn .icon")[0],
                curTemp = $(".currentTemp .temp")[0];
                //console.log(dayObj.icon.length);
                /*for(var j=0; j<dayObj.icon.length; j++){
                    for(var curIconIter=0; curIconIter<curIcon.length;curIconIter++){
                        curIcon[curIconIter].classList.add(dayObj.icon[j]);
                    }
                    weaIcon.classList.add(dayObj.icon[j]);
                    weaIcon.classList.add("black");
                }*/
                
                curIcon.className = (curIcon.className += dayObj.icon);
                /*for(var tempIter=0; tempIter<curTemp.length; tempIter++){*/
                curTemp.innerHTML = dayObj.temp+"&deg";
                //}
                weaIcon.className = dayObj.icon + (" icon black");
            }
            
            docDay = document.createElement('h5');//.appendChild(document.createTextNode(dayObj.day));
            docDay.appendChild(document.createTextNode(dayObj.day));
            docDay.className = "day";
            docImg = document.createElement('span');
            //var iconArray = dayObj.icon.concat(["icon","blue"]);
            docImg.className = (dayObj.icon += (" icon blue"))
            //console.log(iconArray.length);
            //for(var k=0; k<(iconArray.length); k++){
            //    docImg.classList.add(iconArray[k]);
            //}
            docHigh= document.createElement('span');
            //docHigh.appendChild(document.createTextNode(Math.round(dayObj.high)+"&deg");
            docHigh.innerHTML=dayObj.high+"&deg";
            docHigh.className = "high";
            docLow = document.createElement('span');
            docLow.innerHTML=dayObj.low+"&deg";
            //docLow.appendChild(document.createTextNode(Math.round(dayObj.low)+"&deg"));
            docLow.className = "low";
            
            list = document.createElement('li');
            list.appendChild(docDay);
            list.appendChild(docImg);
            list.appendChild(docHigh);
            list.appendChild(docLow);
            rightColList.appendChild(list);
            
        }
    };


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

    drawer = (function(){
        var _drawer = $('.drawer')[0],
            _cube = $('.cubeContent')[0],
            //_plot = $('.page')[0],
            _block = $('#headerBlock')[0],
            minorDelay=10,
            isWeatherWritten=false;

        _open = function(state){
            _cube.classList.add(state);
            _cube.classList.add('closed');
            setTimeout(function(){
                _cube.classList.remove('closed');
                _cube.classList.add('opened');
                _drawer.classList.add('opened');
                //_plot.classList.add('opened');
                _block.classList.add('opened');
            },minorDelay);  
        },
        _close = function(){
            _cube.classList.remove('opened');
            _drawer.classList.remove('opened');
            //_plot.classList.remove('opened');
            _block.classList.remove('opened');
            setTimeout(function(){
                //_ele.classList.toggle('weather',false);
                //_ele.classList.toggle('nav',false);
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

        return {open:_open, 
            close:_close, 
            setState:_setState,
            toggleState:_toggleState,
            state:_state};
    }());

    

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
    /*
    snowbirdWeather = {
        "fiveDay":"",
        "today":""
    };
    cookie=getCookie('Snowbird,UT');
    cookie===""
        ?   getJSONP('http://api.openweathermap.org/data/2.5/weather?q=snowbird,ut&cnt=5&mode=json&units=metric&callback=?&APPID='+'2a875b5c2a61bdb14dc7f2af6876cf7b', function(data){
                            snowbirdWeather.today = data;
                            getJSONP('http://api.openweathermap.org/data/2.5/forecast/daily?q=snowbird,ut&cnt=5&mode=json&units=metric&callback=?&APPID='+'2a875b5c2a61bdb14dc7f2af6876cf7b', function(data){
                                snowbirdWeather.fiveDay = data; 
                                setCookie("Snowbird,UT",JSON.stringify(snowbirdWeather),720);
                            });
                        })
        : snowbirdWeather = getWeatherFromCookie(cookie, function(){
                                setWeatherFromCookie(array);
                            })
    */
    onPageLoad();

}());