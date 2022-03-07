import { VscGithub } from "react-icons/vsc";
import { BsLinkedin } from "react-icons/bs";
import css from "./HomeContent.module.css";
import { useEffect } from "react";

interface Iip {
  ipData: any;
}

export default function homeContent({ ipData }: Iip) {
  return (
    <div className={css.container}>
      <div>
        <h1>Carl Wicker</h1>
        <h2>Front End Web Developer</h2>
        <p>Hello...</p>
        <b className={css.ip}>{ipData.ip}</b>
        <p>
          {ipData.city}, {ipData.country_name}.
        </p>
        <div className={css["social-group"]}>
          <a href="https://github.com/carlwicker" target="_blank">
            <VscGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/carl-wicker-55968611"
            target="_blank"
          >
            <BsLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
}
