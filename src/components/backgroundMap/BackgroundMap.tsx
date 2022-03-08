import { useEffect, useState } from "react";
import css from "./BackgroundMap.module.css";

import "mapbox-gl/dist/mapbox-gl.css";
import Map from "react-map-gl";

interface IipData {
  ipData: any;
  pos: any;
}

export default function BackgroundMap({ ipData, pos }: IipData) {
  const [initialView, setInitalView] = useState<any>({});

  useEffect(() => {
    setInitalView({
      latitude: ipData?.latitude,
      longitude: ipData?.longitude,
      zoom: 7,
      bearing: 0,
      pitch: 0,
    });
  }, [ipData]);

  return (
    <div
      className={css.map}
      // This must stay inline styling.
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: "0",
        top: "0",
      }}
    >
      {initialView.longitude !== undefined &&
      initialView.latitude !== undefined ? (
        <>
          <Map
            initialViewState={initialView}
            mapStyle="mapbox://styles/carlwicker/cl0avqnae003c15t85otw6ofe"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              height: "100vh",
              top: "0",
              width: "100vw",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "200vh",
              fontWeight: "800",
              opacity: "0.05",
              overflow: "hidden",
              // filter: "drop-shadow(20px 20px 5px rgb(0 0 0 / 0.5))",
              backgroundBlendMode: "darken",
            }}
          >
            {pos.x}
            {pos.y}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
