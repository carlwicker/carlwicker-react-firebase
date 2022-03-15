import { useState, useEffect } from "react";

interface IOpenWeather {
  ipData: any;
}

export default function OpenWeather({ ipData }: IOpenWeather) {
  const [openWeather, setOpenWeather] = useState<any>({});

  useEffect(() => {
    async function getOpenWeather() {
      const openWeatherData = await fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          ipData.latitude +
          "&lon=" +
          ipData.longitude +
          "&exclude={part}&appid=" +
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
      {openWeather !== {} ? (
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            fontSize: "20px",
            color: "white",
            bottom: "20px",
            width: "100vw",
            left: "0",
            letterSpacing: "0",
            fontWeight: "100",
            zIndex: "5",
            padding: "10px",
          }}
        >
          <img
            src={`http://openweathermap.org/img/wn/${openWeather?.current?.weather[0]?.icon}.png`}
          />

          <div>
            Humidity: {openWeather?.current?.humidity}
            {" - "}
            {openWeather?.current?.pressure}H/Pa
            {" - "}
            {(openWeather?.current?.temp - 273.15).toFixed(1)} Celsius
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
