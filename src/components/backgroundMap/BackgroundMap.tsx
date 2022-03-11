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
            className={css.heading}
            style={{
              transform: "rotateZ(" + f?.heading + "deg)",
            }}
          >
            <div className={css["plane-icon"]}>
              <MdAirplanemodeActive />
            </div>

            <div className={css["callsign"]}>{f?.callsign}</div>
            <div className={css["heading-course"]}>
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
          <div className={css.xy}>
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
