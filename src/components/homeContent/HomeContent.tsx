interface Iip {
  ipData: any;
}

export default function homeContent({ ipData }: Iip) {
  return (
    <div className="panel">
      <h1>Carl Wicker</h1>
      <h2>Front End Web Developer</h2>
      <div className="title">Hello...</div>
      <h3>{ipData.ip}</h3>
      <p>
        {ipData.city}, {ipData.country_name}.
      </p>
    </div>
  );
}
