import React from "react";
import { useMediaQuery } from "react-responsive";
import { Button, ConfigProvider } from "antd";

import userImg from "../../assets/images/user.png";
import { colors } from "../../assets/colors";
import styles from "./card.module.css";

const Card_Student = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      style={{
        width: "100%",
        // width: isMobile ? 200 : isTablet ? 250 : 300,
        // height: isMobile ? 200 : isTablet ? 250 : 300,
        textAlign: "center",
        // borderRadius: 10,
        // backgroundColor: colors.yiu_dark_blue_light2,
      }}
    >
      <img
        src={props.item.img}
        style={{
          width: isMobile ? 200 : isTablet ? 250 : 250,
          height: isMobile ? 200 : isTablet ? 250 : 250,
          // borderRadius: 10,
          objectFit: "contain",
          alignSelf: "center",
          // backgroundColor: "red",
        }}
      />
      <div>
        <p style={{ fontSize: isMobile ? 15 : 20, fontWeight: "bold" }}>
          {props.item.name}
        </p>
        {/* <p style={{ fontSize: isMobile ? 13 : 15 }}>
          {props.item.major}
          <br />
          {props.item.email}
        </p> */}
      </div>
    </div>
  );
};
export default Card_Student;
