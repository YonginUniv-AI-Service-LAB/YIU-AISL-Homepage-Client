import React from "react";
import { useMediaQuery } from "react-responsive";
import { Button, ConfigProvider } from "antd";

import userImg from "../../assets/images/user.png";
import { colors } from "../../assets/colors";
import styles from "./card.module.css";

const Card_Professor_Contents = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div style={{ marginTop: 50 }}>
      <p style={{ fontSize: isMobile ? 20 : 23, fontWeight: "bold" }}>
        {props.title}
      </p>
      <p tyle={{ fontSize: isMobile ? 18 : 20, fontWeight: "bold" }}>
        {props.contents}
      </p>
    </div>
  );
};
export default Card_Professor_Contents;
