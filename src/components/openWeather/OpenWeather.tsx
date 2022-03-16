import { useState, useEffect } from "react";
import css from "./OpenWeather.module.css";

interface IOpenWeather {
  ipData: any;
}

export default function OpenWeather({ ipData }: IOpenWeather) {
  const [openWeather, setOpenWeather] = useState<any>(undefined);

  useEffect(() => {
    async function getOpenWeather() {
      const openWeatherData = await fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          ipData.latitude +
          "&lon=" +
          ipData.longitude +
          "&appid=" +
          process.env.REACT_APP_OPEN_WEATHER
      )
        .then((response) => {
          return response.json();
        })
        .then(function (data) {
          setOpenWeather(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getOpenWeather();
  }, [ipData]);

  return (
    <div>
      {openWeather ? (
        <div className={css["weather-container"]}>
          <img
            src={`http://openweathermap.org/img/wn/${openWeather?.current?.weather[0]?.icon}.png`}
          />
          <div className={css["weather-info"]}>
            <div>{openWeather?.current?.pressure}HPa</div>
            <div>
              {(openWeather?.current?.temp - 273.15).toFixed(1)} Celsius
            </div>
          </div>
        </div>
      ) : (
        "..."
      )}
    </div>
  );
}
