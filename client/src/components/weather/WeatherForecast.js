const WeatherForecast = (props) => {
    return (
        <div className="weather-forecast flex-row-strd">
            <div className="flex-col-strd">
                <h4 className="no-margin">{Math.round(props.temp) + "°C"}</h4>
                <p className="no-margin">{props.desc}</p>
            </div>
            <img src={"/images/icons/" + props.icon + ".png"} alt="icon" />
        </div>
    )
}
export default WeatherForecast;