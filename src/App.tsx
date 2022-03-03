import "./App.css";
import HomeContent from "./components/homeContent/HomeContent";
import { useEffect, useState } from "react";

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
    <div className="App">
      <HomeContent ipData={ipData} />
    </div>
  );
}
