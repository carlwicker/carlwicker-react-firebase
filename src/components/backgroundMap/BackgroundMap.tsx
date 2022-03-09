import { useEffect, useState, useMemo } from "react";
import css from "./BackgroundMap.module.css";
import { MdAirplanemodeActive } from "react-icons/md";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";

interface IipData {
  ipData: any;
  pos: any;
  flights: any;
}

export default function BackgroundMap({ ipData, pos, flights }: IipData) {
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

  const pins = useMemo(
    () =>
      flights?.map((f: any, index: number) => (
        <Marker
          key={`marker-${index}`}
          longitude={f?.positions[0].lon}
          latitude={f?.positions[0].lat}
          anchor="bottom"
        >
          <div
            style={{
              color: "red",
              fontSize: "30px",
              fontWeight: "800",
              transform: "rotateZ(" + f?.heading + "deg)",
              opacity: "1",
            }}
          >
            <MdAirplanemodeActive />
            <div
              style={{
                color: "grey",
                fontSize: "30px",
                padding: "0",
              }}
            >
              {f?.callsign}
            </div>
            <div
              style={{
                color: "white",
                fontSize: "10px",
                padding: "0",
                fontWeight: "100",
              }}
            >
              HEADING: {f?.heading.toFixed()}
            </div>
          </div>
        </Marker>
      )),
    [flights]
  );

  useEffect(() => {
    console.log(flights);

    flights?.map((f: any, index: number) => {
      console.log(f);
    });
  }, [flights]);

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
      initialView.latitude !== undefined &&
      flights !== [] ? (
        <>
          <Map
            initialViewState={initialView}
            mapStyle="mapbox://styles/carlwicker/cl0avqnae003c15t85otw6ofe"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          >
            {pins}
          </Map>
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
