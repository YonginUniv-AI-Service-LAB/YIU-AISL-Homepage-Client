import React from "react";
import { useMediaQuery } from "react-responsive";
import Fade from "react-reveal/Fade";

import styles from "./main.module.css";
import { colors } from "../../assets/colors";
import { aisl } from "../../assets/string/aisl";

const MainProject = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      style={{
        height: 300,
        backgroundColor: colors.grey_light2,
      }}
    >
      <p style={{ textAlign: "center" }}>프로젝트들 보여줄거임</p>
    </div>
  );
};
export default MainProject;
