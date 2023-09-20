import React from "react";
import { useMediaQuery } from "react-responsive";
import Fade from "react-reveal/Fade";

import styles from "./main.module.css";
import { colors } from "../../assets/colors";
import { aisl } from "../../assets/string/aisl";
import Main_ContentTitle from "../../components/Text/Main_ContentTitle";

const MainIntro = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      style={{
        textAlign: "center",
        margin: "0 auto",
        width: isMobile ? "90%" : isTablet ? "70%" : "50%",
        whiteSpace: "pre-line",
      }}
    >
      <Fade top>
        <Main_ContentTitle title={"AI SERVICE LAB"} />
      </Fade>

      <Fade bottom>
        <p style={{ fontWeight: "bold", fontSize: isMobile ? 20 : 25 }}>
          {aisl.slogan}
        </p>
        <p style={{ fontWeight: "bold", fontSize: isMobile ? 15 : 20 }}>
          {aisl.mainMsg}
        </p>
      </Fade>
    </div>
  );
};
export default MainIntro;
