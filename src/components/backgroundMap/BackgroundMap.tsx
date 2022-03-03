import { useEffect, useState } from "react";
import Map, { FullscreenControl } from "react-map-gl";

interface IipData {
  ipData: any;
}

export default function BackgroundMap({ ipData }: IipData) {
  const [initialView, setInitalView] = useState<any>({});

  useEffect(() => {
    setInitalView({
      latitude: ipData?.latitude,
      longitude: ipData?.longitude,
      zoom: 8,
      bearing: 0,
      light: "Light",
      pitch: 0,
    });
  }, [ipData]);

  return (
    <div
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
        <Map
          initialViewState={initialView}
          mapStyle="mapbox://styles/carlwicker/cl0avqnae003c15t85otw6ofe"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        />
      ) : (
        ""
      )}
    </div>
  );
}
