import "./App.css";
import { useEffect, useState } from "react";
import BackgroundMap from "./components/backgroundMap/BackgroundMap";
import HomeContent from "./components/homeContent/HomeContent";

export default function App() {
  const [ipData, setIpData] = useState<any>({});
  const [pos, setPos] = useState<any>({ x: 0, y: 0 });
  const [flights, setFlights] = useState<any>([]);

  // Mouse Cords
  function getPosition(e: any) {
    setPos({ x: e.clientX, y: e.clientY });
  }

  // Get IP
  useEffect(() => {
    function getIp() {
      fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => setIpData(data));
    }
    getIp();
  }, []);

  // Get Flights
  useEffect(() => {
    async function getFlights() {
      const apiData = await fetch(
        "https://api.flightstats.com/flex/flightstatus/rest/v2/json/flightsNear/" +
          ipData.latitude +
          "/" +
          ipData.longitude +
          "/500?appId=" +
          process.env.REACT_APP_FLIGHTSTATS_APPID +
          "&appKey=" +
          process.env.REACT_APP_FLIGHTSTATS_TOKEN +
          "&maxFlights=5"
      )
        .then((response) => response.json())
        .then((data) => {
          setFlights(data);
        });
    }
    getFlights();
    // console.log(flights);
  }, [ipData]);

  // Open Sky API
  const [openSkyData, setOpenSkyData] = useState<any>();

  useEffect(() => {
    async function openSky() {
      const apiData = await fetch(
        "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=" +
          ipData.latitude +
          "&lon=" +
          ipData.longitude,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_WEATHER as string,
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    openSky();
  }, [ipData]);

  useEffect(() => {
    console.log(openSkyData);
  }, [openSkyData]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        padding: "20px",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
      onMouseMove={(e: any) => {
        getPosition(e);
      }}
    >
      <BackgroundMap
        ipData={ipData}
        pos={pos}
        flights={flights.flightPositions}
      />
      <HomeContent ipData={ipData} />
    </div>
  );
}
