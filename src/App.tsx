import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import HomeContent from "./components/homeContent/HomeContent";
import { useEffect, useState } from "react";
import BackgroundMap from "./components/backgroundMap/BackgroundMap";

export default function App() {
  const [ipData, setIpData] = useState<any>({});

  useEffect(() => {
    function getIp() {
      fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => setIpData(data));
    }
    getIp();
  }, []);

  return (
    <>
      <BackgroundMap ipData={ipData} />

      <HomeContent ipData={ipData} />
    </>
  );
}
