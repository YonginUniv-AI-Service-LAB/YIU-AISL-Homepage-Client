import React from "react";
import { useMediaQuery } from "react-responsive";
import { Button, ConfigProvider } from "antd";

import styles from "./text.module.css";
import { colors } from "../../assets/colors";

const Main_ContentTitle = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          color: colors.yiu_dark_blue,
          fontSize: isMobile ? 25 : 35,
          fontWeight: "bold",
        }}
      >
        {props.title}
      </p>
      <div className={styles.hr} />
    </div>
  );
};
export default Main_ContentTitle;
