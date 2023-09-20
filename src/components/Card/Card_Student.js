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
        textAlign: "center",
        borderRadius: 10,
        // backgroundColor: colors.yiu_dark_blue_light2,
        paddingTop: 30,
        paddingBottom: 20,
      }}
    >
      <img
        src={props.item.img}
        style={{
          width: 400,
          height: 400,
          borderRadius: 10,
          objectFit: "contain",
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
