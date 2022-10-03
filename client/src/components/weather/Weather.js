import { useEffect, useState } from 'react';
import WeatherForecast from './WeatherForecast';

const Weather = () => {

    const [weatherData, setWeatherData] = useState(null)
    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch('/api/weather');
            const json = await response.json();
            if (response.ok) {
                setWeatherData(json)
            }
        }
        fetchWeather();
    }, [])

    return (
        <div id="weather-section" className="section">
            <div className="current-weather flex-row-strd">
                <img src={weatherData && "/images/icons/" + weatherData.current.weather[0].icon + ".png"} alt="icon" />
                <div className="flex-col-strd">
                    <h1 className="no-margin">{weatherData && Math.round(weatherData.current.temp) + "°C"}</h1>
                    <h3 className="no-margin">{weatherData && weatherData.current.weather[0].description}</h3>
                </div>
            </div>
            {weatherData && weatherData.daily.slice(0, 3).map((day, index) => {
                return <WeatherForecast temp={day.temp.max} desc={day.weather[0].description} icon={day.weather[0].icon} key={index} />
            })}
        </div>
    )
}
export default Weather;