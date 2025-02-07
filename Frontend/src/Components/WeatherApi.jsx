import React, { useState, useEffect } from 'react';
import './WeatherApi.css';
import './Weather.css';

const WeatherApi = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [PhotoLink, setPhotoLink] = useState();
  const [cityname, setCityname] = useState('');
  const [num, setnum] = useState(1);
  const [store, setstore] = useState('');
  const [Haze, setHaze] = useState(false);
  const [Cloudy, setCloudy] = useState(false);
  const [Clear, setClear] = useState(false);

  setTimeout(() => {
    if (num === 1) {
      setnum(2);
    } else if (num === 2) {
      setnum(3);
    } else if (num == 3) {
      setnum(4)
    } else {
      setnum(1)
    }
  }, 10000);


  const change = () => {
    if (cityname === "") {
      setCityname("Delhi");
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=a504a2283bdd897a240134eda86e962d&units=metric`;
    let photourl = `https://api.unsplash.com/search/photos?page=1&query=${cityname}&client_id=u4wteVZwmT1rGheyRaMhdI_o28dVBMcIK4HhHVqaXPA`;

    setstore(cityname);
    setCityname('');
    fetch(url)
      .then((res) => res.json())
      .then((apidata) => {
        setWeatherData(apidata);
        let des = apidata.weather[0].main;
        if (des === "Haze") {
          setHaze(true);
          setCloudy(false);
          setClear(false);
        } else if (des === "Clouds") {
          setCloudy(true);
          setHaze(false);
          setClear(false);
        } else {
          setCloudy(false);
          setHaze(false);
          setClear(true);
        }
      })
      .catch(() => console.error("Data is Not Found"));

    fetch(photourl)
      .then((res) => res.json())
      .then((data) => {
        let lnk = data.results[3].urls.small
        setPhotoLink(lnk);
        console.log(PhotoLink);
      })
      .catch(() => {
        console.error("No Info Found")
      })
  };

  return (
    <div className='head'>
      <div className={`container-fluid bgimg${num} main`}>
        <div className="row">
          <div className="col-md-12">

            <div className="inputfield">
              <button onClick={change}>
                <i className="ri-search-line"></i>
              </button>
              <input type="text" value={cityname} onChange={(e) => setCityname(e.target.value)} className='searchbox' placeholder='Enter Location' />
            </div>
            {weatherData.main && (
              <>
                <div className="row con-1">
                  <div className="col-md-2 card">
                    <h3 className='ctyname'>{(Haze || Cloudy || Clear) && <i className="ri-map-pin-2-line"></i>}{store}</h3>
                    {weatherData.main && (
                      <p className='icontemp'>{Haze && <i className="ri-haze-fill"></i>}
                        {Cloudy && <i className="ri-cloudy-fill"></i>} {Clear && <i className="ri-moon-clear-fill"></i>}
                        <span className='temp'> {weatherData.main.temp}°C</span>
                        <span className='RealFeel'><h6>RealFeels {weatherData.main.feels_like}°C</h6></span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7 submain">
                    <div className="photo">
                      {PhotoLink && <img src={PhotoLink} alt="No Info Found" className='ctyphoto' />}
                    </div>
                    <div className="detail">
                      {weatherData.weather && weatherData.weather[0] && (
                        <h5 className='wetype'><i class="ri-arrow-right-wide-line"></i>Description: {weatherData.weather[0].main}</h5>
                      )}
                      {weatherData.main && (
                        <h5 className='humid'><i class="ri-drop-line"></i> Humidity: {weatherData.main.humidity} %</h5>
                      )}
                      {(weatherData.main &&
                        <h5 className='tempmin'><i class="fa-solid fa-temperature-full"></i> Temp Min: {weatherData.main.temp_min} °C</h5>
                      )}
                      {(weatherData.main &&
                        <h5 className='temmax'><i class="fa-solid fa-temperature-empty"></i> Temp Max: {weatherData.main.temp_max} °C</h5>
                      )}
                      {(weatherData.main &&
                        <h5 className='pree'><i class="ri-speed-up-fill"></i> Pressure: {weatherData.main.pressure} hPa</h5>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default WeatherApi;
