interface Iip {
  ipData: any;
}

export default function homeContent({ ipData }: Iip) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: "0",
        top: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h1 style={{ fontWeight: "500" }}>Carl Wicker</h1>
        <h2 style={{ fontWeight: "300" }}>Front End Web Developer</h2>
        <p>Hello...</p>
        <b>{ipData.ip}</b>
        <p>
          {ipData.city}, {ipData.country_name}.
        </p>
      </div>
    </div>
  );
}
