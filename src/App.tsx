import "./App.css";
import { useEffect, useState } from "react";
import BackgroundMap from "./components/backgroundMap/BackgroundMap";
import HomeContent from "./components/homeContent/HomeContent";

export default function App() {
  const [ipData, setIpData] = useState<any>({});
  const [pos, setPos] = useState<any>({ x: 0, y: 0 });

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
