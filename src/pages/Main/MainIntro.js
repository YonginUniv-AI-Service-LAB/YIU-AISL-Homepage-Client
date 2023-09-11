import React from "react";
import { useMediaQuery } from "react-responsive";
import Fade from "react-reveal/Fade";

import styles from "./main.module.css";
import { colors } from "../../assets/colors";
import { aisl } from "../../assets/string/aisl";

const MainIntro = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 100,
        marginBottom: 150,
        marginLeft: 100,
        marginRight: 100,
        whiteSpace: "pre-line",
      }}
    >
      <Fade top>
        <h1 style={{ color: colors.yiu_dark_blue }}>AI SERVICE LAB</h1>
        <div className={styles.hr} />
      </Fade>

      <Fade bottom>
        <h2>{aisl.slogan}</h2>
        <h3>{aisl.mainMsg}</h3>
      </Fade>
    </div>
  );
};
export default MainIntro;
