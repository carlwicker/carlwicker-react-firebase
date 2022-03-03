import { VscGithub } from "react-icons/vsc";
import css from "./HomeContent.module.css";

interface Iip {
  ipData: any;
}

export default function homeContent({ ipData }: Iip) {
  return (
    <div className={css.container}>
      <div>
        <h1 style={{ fontWeight: "500" }}>Carl Wicker</h1>
        <h2 style={{ fontWeight: "300" }}>Front End Web Developer</h2>
        <p>Hello...</p>
        <b className={css.ip}>{ipData.ip}</b>
        <p>
          {ipData.city}, {ipData.country_name}.
        </p>
        <a href="https://github.com/carlwicker">
          <VscGithub />
        </a>
      </div>
    </div>
  );
}
