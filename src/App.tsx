import "./App.css";
import { useEffect, useState } from "react";
import BackgroundMap from "./components/backgroundMap/BackgroundMap";
import HomeContent from "./components/homeContent/HomeContent";

export default function App() {
  const [ipData, setIpData] = useState<any>({});
  const [pos, setPos] = useState<any>({ x: 0, y: 0 });
  const [flights, setFlights] = useState<any>({});

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
      let apiTest =
        "https://api.flightstats.com/flex/flightstatus/rest/v2/json/flightsNear/50.8/0.13/100?appId=1da39546&appKey=8ae7e8a3b86817946500dfb847c95b80&maxFlights=25";
      // let data = await // apiTest

      const apiData = await fetch(
        "https://api.flightstats.com/flex/flightstatus/rest/v2/json/flightsNear/" +
          ipData.latitude +
          "/" +
          ipData.longitude +
          "/100?appId=" +
          process.env.REACT_APP_FLIGHTSTATS_APPID +
          "&appKey=" +
          process.env.REACT_APP_FLIGHTSTATS_TOKEN +
          "&maxFlights=5"
      )
        .then((response) => response.json())
        .then((data) => setFlights(data));
    }
    getFlights();
  }, [ipData]);

  useEffect(() => {
    console.log(flights);
  }, [flights]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        padding: "20px",
        alignContent: "center",
        justifyContent: "center",
      }}
      onMouseMove={(e: any) => {
        getPosition(e);
      }}
    >
      <BackgroundMap ipData={ipData} pos={pos} />
      <HomeContent ipData={ipData} />
    </div>
  );
}
